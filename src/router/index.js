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
  const downloadProgress = ref(0);  //存文件下載進度%

  const downloadBackFiles = async () => { 
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
          
          emit('updateProgress' , { progress,Loaded,Total,Timer,Speed });// 發射事件，傳遞目前下載進度
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
    finally{
      downloadProgress.value = 0;  // 下载完成后重置进度
    }
  };
  return {downloadBackFiles};
}


/* pr:當前值, prto:即將過渡到的新值*/
export function useSmoothUpdate(pr){
  function smoothUpdate(prto) {
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
  return { smoothUpdate };   //外部元件就可以透過解構這個函數來使用
}