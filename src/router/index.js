import { createRouter, createWebHistory } from 'vue-router'
import FileDownload from '../views/FileDownload.vue'
import ProgressBar from '../views/ProgressBar.vue'
import NewBar from '../views/NewBar.vue'
import FileDrop from '../views/FileDrop.vue';
import axios from 'axios';
import { ref } from 'vue';


const routes = [
  {
    path: '/',
    name: 'FileDownload',
    component: FileDownload
  },
  {
    path: '/ProgressBar',
    name: 'ProgressBar',
    component: ProgressBar
  },
  {
    path: '/NewBar',
    name: 'NewBar',
    component: NewBar
  },
  {
    path: '/FileDrop',
    name: 'FileDrop',
    component: FileDrop
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

// 通用的下载功能
export async function handleDownload({ url, filename, callbacks }) {
  const { resetProgress, updateProgress } = callbacks;

  if (!url) {
    console.error('Download URL is not provided');
    resetProgress();
    return;
  }

  const startTime = Date.now();
  resetProgress();

  try {
    const response = await axios.get(url, {
      responseType: 'blob',
      onDownloadProgress: progressEvent => {
        const total = progressEvent.total;
        const loaded = progressEvent.loaded;
        const progress = Math.floor((loaded / total) * 100);// 下載進度
        const timer = (Date.now() - startTime) / 1000;// 經過時間
        const speed = loaded / timer;  //下載速度
        updateProgress({ progress, loaded, total, timer, speed });
      },
    });

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
  }
}

/* ProgressBar下載檔案 */
export function useBackFiles(callbacks){
  // 下載文件的URL
  const url = 'http://localhost:3000/download-pdf';
  const filename = 'algorithms.pdf';

  // 返回一個函數，當調用時執行下載
  return () => handleDownload({ url, filename, callbacks });
}

/* NewBar下載檔案 */
export function downloadUploadFiles(callbacks) {
  // 從 localStorage 獲取下載文件的 URL 和原始文件名
  const url = localStorage.getItem('downloadUrl');
  const filename = localStorage.getItem('originalFilename') || 'defaultFilename.pdf';// 如果没有原始文件名，使用默认的
  return () => handleDownload({ url, filename, callbacks });
}

/* UpFile上傳並獲取info */
async function uploadFileToServer(file, callbacks) {
  const formData = new FormData();
  formData.append('file', file);
  // 重置进度信息
  if (callbacks && callbacks.resetProgress) {
    callbacks.resetProgress();
  }
  const startTime = Date.now();
  try {
    const response = await axios.post('http://localhost:3000/upload-file', formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        const total = progressEvent.total;  //文件總大小
        const loaded = progressEvent.loaded; //已下載大小
        const progress = Math.floor((loaded / total) * 100); //當前下載進度
        const timer = (Date.now() - startTime) / 1000; //已經過時間
        const speed = loaded / timer; 
        
        // 更新進度信息
        if (callbacks && callbacks.updateProgress) {
          callbacks.updateProgress({
            progress,
            loaded,
            total,
            timer,
            speed,
          });
        }
      }
    });
    if (response.data && response.data.downloadUrl) {
      // localStorage 保存下载URL
      localStorage.setItem('downloadUrl', response.data.downloadUrl);
      localStorage.setItem('originalFilename', response.data.originalFilename);
      console.log('File uploaded successfully, download URL saved.');
    } else {
      console.error('Upload failed or download URL missing');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

/*----------- UpFile動作觸發上傳 ------------*/
  // 處理drop事件event對象
export function handleDrop(active, emit ,callbacks) {
  return async function(event) {
    active.value = !active.value; 
    if (event.dataTransfer.files.length) {
      const file = event.dataTransfer.files[0];
      emit('fileDropped', file);
      await uploadFileToServer(file, callbacks);  
    }
    active.value = !active.value;
  }
}
// 選擇文件時觸發
export function onFileChange(emit, callbacks) {
  return async function(event) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      emit('fileDropped', file);
      await uploadFileToServer(file, callbacks);
    }
  }
}
/*----------- 獲取進度參數狀態 ------------*/
// 初始化
export const schedule = ref(0);
export const loaded = ref(0);
export const total = ref(0);
export const timer = ref(0);
export const speed = ref(0);

// 重置进度
export function resetProgress() {
  schedule.value = 0;
  loaded.value = 0;
  total.value = 0;
  timer.value = 0;
  speed.value = 0;
}

// 更新進度
export function updateProgress({ progress, loaded: l, total: t, timer: tm, speed: s }) {
  schedule.value = progress;
  loaded.value = l;
  total.value = t;
  timer.value = tm;
  speed.value = s;
}