<template>
  <div class="circle">
    <div
    class="RadialProgress"
    role="progressbar"     
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="schedule"
    :style="{ '--schedule': schedule + '%' }"
    >{{ schedule }}%</div>
  </div> 

  <div class="container">
    <div class="wrap">
    <a class="btn-11" href="#" @click="startDownload">Click to Download</a>
    </div>                                 
  </div>

  <div class="download-info">
    <li><b>Loaded:</b> {{ (loaded / 1000 / 1000).toFixed(2) }} MB</li>
    <li><b>Total:</b> {{ (total / 1000 / 1000).toFixed(2) }} MB</li>
    <li><b>Timer:</b> {{ timer.toFixed(2) }} s </li>
    <li><b>Speed:</b> {{ (speed * 8 / 1000 / 1000).toFixed(2) }} Mbps</li>
  </div>

</template>
  
<script setup>
import "@/assets/viewstyle.css";
import { downloadUploadFiles } from '@/router/index.js';
import { schedule, loaded, total, timer, speed, resetProgress, updateProgress } from '@/router/index.js';

// 直接使用返回的函数
const startDownload = downloadUploadFiles({ resetProgress, updateProgress });
</script>
  
  