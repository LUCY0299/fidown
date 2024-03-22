<template>
  <div class="about">
    <h3>抓網路URL給用戶下載⬇</h3>
  </div>
  <div class="Filedisplay">
    <button @click="downloadOlineFiles">Download</button>
  </div>
</template>

<script setup>
import axios from 'axios';

const downloadOlineFiles = () =>{
  const imgUrl = 'https://mis.ccu.edu.tw/var/file/120/1120/img/197/236420716.pdf';
  axios({
    url: imgUrl,
    method:'GET',
    responseType:'blob',  //以Blob形式接收響應數據
    onDownloadProgress: function(progressEvent){
      console.log(((progressEvent.loaded / progressEvent.total)*100).toFixed() + "%");
    }
  })
  .then(response => {
    const url= window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download','front.pdf')  //下載的文件指定名稱
    document.body.appendChild(link)
    link.click()
  })
  .catch(error => console.error('Download error:', error))

};
</script>



