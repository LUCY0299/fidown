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
    <!--role指定角色為進度條; 
        aria-valuemin 和 aria-valuemax 屬性指定進度條的最小值和最大值， aria-valuenow 描述其當前狀態;
        style -> 将 progress 变量的值赋给 CSS 变量 --progress，用于控制圆形进度条的填充度;
        {{ 进度条内部显示当前的进度百分比 }}
    -->
  </div>

  <div class="container">
    <div class="wrap">
      <a class="btn-11" href="#" @click="downloadBackFiles">Click to Download</a>
    </div>                                 
  </div>

  <div class="download-info">
    <li><b>Loaded:</b> {{ (loaded / 1000 / 1000).toFixed(2) }} MB</li>
    <li><b>Total:</b> {{ (total / 1000 / 1000).toFixed(2) }} MB</li>
    <li><b>Timer:</b> {{ timer.toFixed(2) }} s </li>
    <li><b>Speed:</b> {{ (speed * 8 / 1000 / 1000).toFixed(2) }} Mbps</li>
  </div>

  <footer>
  <svg viewBox="0 0 120 20" preserveAspectRatio="xMidYMid meet">
  <defs> 
    <mask id="xxx">
      <circle cx="7" cy="12" r="40" fill="#fff" />
    </mask>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="
        1 0 0 0 0  
        0 1 0 0 0  
        0 0 1 0 0  
        0 0 0 13 -9" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    <path id="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
  </defs> 
                                          <!-- 不同的y值改變垂直位置,層疊效果 -->
  <use id="wave3" class="wave" xlink:href="#wave" x="0" y="0" ></use>  
  <use id="wave2" class="wave" xlink:href="#wave" x="0" y="1" ></use>
 
  <!--圖片-->
  <g class="topball-img"> 
    <image href="../assets/logo圓.png" x="105" y="4" height="8px" width="10px"></image>
  </g>

  <!--水滴效果-->
  <g class="gooeff">
    <!--cx圓心的x坐標,r半徑-->
    <circle class="drop drop1" cx="20" cy="2" r="1.8"  />
    <circle class="drop drop2" cx="25" cy="2.5" r="1.5"  />
    <circle class="drop drop3" cx="16" cy="2.8" r="1.2"  />
    <use id="wave1" class="wave" xlink:href="#wave" x="0" y="1" /> <!--y=1向下1單位-->
  </g>
  </svg>
  </footer>
</template>

<script setup>
import "@/assets/viewstyle.css";
import { onMounted } from 'vue';
import { useRoute } from "vue-router";
import { useBackFiles } from '@/router/index.js';
import { schedule, loaded, total, timer, speed, resetProgress, updateProgress } from '@/router/index.js';

const route = useRoute();

// 直接使用返回的函数
const downloadBackFiles = useBackFiles({ resetProgress, updateProgress });

onMounted(() => {
    // 檢查URL參數是否指定了startDownload
    if (route.query.startDownload === 'true') {
        downloadBackFiles(); // 如果是，則執行下載
    }
    //?path=/ProgressBar
    if(route.path === '/ProgressBar'){
      downloadBackFiles();
    }


  window.onresize = function() {
  var svg = document.querySelector("footer svg");
    if(svg){
      var width = window.innerWidth;

      if (width > 1000) {
        svg.setAttribute("viewBox", "0 0 120 21"); 
      }else if(width < 500){
        svg.setAttribute("viewBox", "0 0 120 30"); 
      }else {
        svg.setAttribute("viewBox", "0 0 120 20"); // 默认值
      }
    }
  };
});
</script>

