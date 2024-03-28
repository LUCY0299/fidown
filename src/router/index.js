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

/* ProgressBar下載檔案 */
export function useBackFiles(callbacks){
  const downloadProgress = ref(0);  //存文件下載進度%

  async function downloadBackFiles() { 
    // 直接調用回調函數而不是發射事件
    if (callbacks && callbacks.resetProgress) {
      callbacks.resetProgress();
    }

    downloadProgress.value = 0;

    const startTime = Date.now();  // 记录下载开始的时间
    
    try{
      const response = await axios.get('http://localhost:3000/download-pdf' , {
        responseType: 'blob',  //以二進制形式接收響應數據
        onDownloadProgress: progressEvent => {
          const Total = progressEvent.total;
          const Loaded = progressEvent.loaded;
          
          const progress = Math.floor((Loaded / Total) * 100); // 计算当前下载进度
          const Timer = ( Date.now()- startTime ) /1000;   // 计算经过时间(秒)
          const Speed = Total /  Timer;   // 计算当前下载速度(bytes per second)

          downloadProgress.value = progress;
          
          // 直接調用回調函數來更新進度
          if (callbacks && callbacks.updateProgress) {
            callbacks.updateProgress({
              progress: progress,
              Loaded: Loaded,
              Total: Total,
              Timer: Timer,
              Speed: Speed
            });
          }
        }
  
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));  //建立一個指向下載資料的URL
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download','MIS.pdf');
      document.body.appendChild(link)
      link.click()
  
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }  
    catch (error) {
      console.error('Download error:', error);
    }
  }
  return downloadBackFiles;
}

/* NewBar下載檔案 */
export async function downloadUploadFiles(callbacks) {
  const downloadUrl = localStorage.getItem('downloadUrl');
  const originalFilename = localStorage.getItem('originalFilename') || 'defaultFilename.pdf'; // 如果没有原始文件名，使用默认的
  const { resetProgress, updateProgress } = callbacks;
  
  if (!downloadUrl) {
    console.error('No download URL available');
    resetProgress();
    return;
  }

  const startTime = Date.now(); // 记录下载开始的时间
  resetProgress(); // 重置进度条

  try {
    const response = await axios.get(downloadUrl, {
      responseType: 'blob', // 以二进制形式接收响应数据
      onDownloadProgress: progressEvent => {
        const total = progressEvent.total; // 文件总大小
        const loaded = progressEvent.loaded; // 已下载大小
        const progress = Math.floor((loaded / total) * 100); // 计算当前下载进度
        const timer = (Date.now() - startTime) / 1000; // 计算经过时间(秒)
        const speed = loaded / timer; // 计算当前下载速度(bytes per second)

        // 调用回调函数来更新进度信息
        updateProgress({
          progress: progress,
          Loaded: loaded,
          Total: total,
          Timer: timer,
          Speed: speed
        });
      }
    });

    // 处理下载完成的文件
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', originalFilename);  //使用原始文件名
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    console.error('Download error:', error);
  }
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
        const total = progressEvent.total; // 文件总大小
        const loaded = progressEvent.loaded; // 已下载大小
        const progress = Math.floor((loaded / total) * 100); // 计算当前下载进度
        const timer = (Date.now() - startTime) / 1000; // 计算经过时间(秒)
        const speed = loaded / timer; 
        
        // 更新进度信息
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
      // 假设使用 localStorage 来保存下载 URL
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

  // 處理 drop 事件 event對象
export function handleDrop(active, emit ,callbacks) {
  return async function(event) {
    active.value = !active.value; // 切換激活狀態
    if (event.dataTransfer.files.length) {
      const file = event.dataTransfer.files[0];
      emit('fileDropped', file);
      await uploadFileToServer(file, callbacks);  //上傳該檔案
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
      await uploadFileToServer(file, callbacks);  //上傳該檔案
    }
  }
}


export function smoothUpdate(pr,prto) {        // pr:當前值, prto:即將過渡到的新值
  let start = pr.value || 0;  //pr.value是falsy值,=> 0
  let end = prto;
  let duration = 500;  //動畫持續時間,單位為毫秒
  let startTime;       //動畫開始的具體時間點

  function update(time) {
    if (startTime === undefined) {
      startTime = time;
    }
    const elapsed = time - startTime;  //動畫開始到目前影格的時間差
    const fraction = Math.min(elapsed / duration, 1);  //動畫目前的完成進度比例,時間差與動畫總持續時間的比值,不超過1

    // 使用線性內插法計算當前進度
    pr.value = Math.floor(start + (end - start) * fraction);

      //動畫未完成繼續遞迴
    if (elapsed < duration) {  
      requestAnimationFrame(update);  //requestAnimationFrame用法 =>向瀏覽器請求在下次重繪前呼叫這個動畫函數
    }
  }
  //進行下一幀
  requestAnimationFrame(update);
}
