import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FileDownload from '../views/FileDownload.vue'
import ProgressBar from '../views/ProgressBar.vue'
import axios from 'axios';
import { ref } from 'vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/FileDownload',
    name: 'FileDownload',
    component: FileDownload
  },
  {
    path: '/ProgressBar',
    name: 'ProgressBar',
    component: ProgressBar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

export function useBackFiles(emit){
  const downloadProgress = ref(0);

  const downloadBackFiles = async () => { 
    try{
      const response = await axios.get('http://localhost:3000/download-pdf' , {
        responseType: 'blob',  //以二進制形式接收響應數據
        onDownloadProgress: progressEvent => {
            const total = progressEvent.total;
            const current = progressEvent.loaded;
            // 计算当前下载进度
            const progress = Math.floor((current / total) * 100);
            downloadProgress.value = progress;
            /* console.log(progress); */
            
            emit('updateProgress' , progress);// 發射事件，傳遞目前下載進度
        }
  
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
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
    finally{
      downloadProgress.value = 0;  // 下载完成后重置进度
    }
  };
  return {downloadBackFiles, downloadProgress};
}
