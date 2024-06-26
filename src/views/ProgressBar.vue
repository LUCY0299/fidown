<template>
  <div class="page-content">
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
  </div>
  
</template>

<script setup>
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
        svg.setAttribute("viewBox", "0 0 120 20"); 
      }
    }
  };
});
</script>

<style scoped>
.page-content {
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
}
/* circleBar */
.circle {
display:flex;
justify-content: center;
}

.RadialProgress {
--hue: 215;       
--holesize: 60%; 
--track-bg: hsl(233 34% 92%);  

block-size: 40vmin;       
inline-size: 40vmin;
min-inline-size: 90px;
min-block-size: 90px;
display: grid;            
place-items: center;

position: relative;
font-weight: 700;
font-size: max(6.5vmin, 1.4rem);

&::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
    z-index: -1;
    background: conic-gradient(       /* 圆锥渐变创建圆形进度的效果 */
    hsl(var(--hue) 100% 70%),
    hsl(var(--hue) 100% 40%),
    hsl(var(--hue) 100% 70%) var(--schedule, 0%),
    var(--track-bg) var(--schedule, 0%) 100%
    );
    
    mask-image: radial-gradient(      /* 中心空白圓環 */
    transparent var(--holesize),    
    black calc(var(--holesize) + 0.5px)  
    );
  }
}

/* Button */
.wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 0 1rem;
}
.btn-11 {
position: relative;
display: block;
overflow: hidden;
width: 190px;
height: 60px;
max-width: 250px;
margin: 1rem auto;
border: 2px solid rgba(186, 196, 199, 0.822);
border-radius: 35px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

text-decoration: none;
font-weight: bold;
color: #4638c2;
display: flex;
justify-content: center;
align-items: center;
}

.btn-11:before,
.btn-11:after {
content: '';
position: absolute;
top: 50%;
width: 20px;
height: 20px;
background-color: #4638c2;
border-radius: 50%;
z-index: -1;
}

.btn-11:before {
left: -20px;
transform: translate(-50%, -50%);
}

.btn-11:after {
right: -20px;
transform: translate(50%, -50%);
}

.btn-11:hover {
color: rgba(255, 255, 255, 0.75);
}

.btn-11:hover:before {
animation: criss-cross-left 0.8s both;
animation-direction: alternate;
}

.btn-11:hover:after {
animation: criss-cross-right 0.8s both;
animation-direction: alternate;
}

@keyframes criss-cross-left {
0% {
    left: -20px;
}
50% {
    left: 50%;
    width: 20px;
    height: 20px;
}
100% {
    left: 50%;
    width: 375px;
    height: 375px;
}
}

@keyframes criss-cross-right {
0% {
    right: -20px;
}
50% {
    right: 50%;
    width: 20px;
    height: 20px;
}
100% {
    right: 50%;
    width: 375px;
    height: 375px;
}
}

/* download-info */
.download-info{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 100px;
}
.download-info li {
  position: relative; 
  padding: 10px 0;
}

.download-info li::before {
  content: ''; 
  position: absolute;
  left: 0%; 
  right: 0%; 
  top: 0; 
  border-top: 2px solid #ddddddd7; 
}

.download-info li:first-child::before {
  border-top: none; 
}


  /* wave part */
footer {
  width:100vw;
  position:fixed;
  bottom:0px
}
svg {
  width:100%;
  height: auto;
}
.topball-img {
  animation: ball 1.5s ease-in-out infinite alternate 0.3s;
  animation-iteration-count:infinite;
  animation-direction: alternate;
  animation-delay: 0.3s;
  cursor: pointer;
}
.wave {
  animation: wave 3s linear;
  animation-iteration-count:infinite;
  fill: #4478e3;
}
.drop {
  fill: transparent;
  animation: drop 5s ease infinite normal;
  stroke: #4478e3;
  stroke-width:0.5;
  opacity:.6; 
  transform: translateY(80%);
}
.drop1 {
  transform-origin: 20px 3px;
}
.drop2 {
  animation-delay: 3s;
  animation-duration:3s;
  transform-origin: 25px 3px;
}
.drop3 {
  animation-delay: -2s;
  animation-duration:3.4s;
  transform-origin: 16px 3px;
}
.gooeff {
  filter: url(#goo);
}
#wave2 {
  animation-duration:5s;
  animation-direction: reverse;
  opacity:.6;
}
#wave3 {
  animation-duration: 7s;
  opacity:.3;
}
@keyframes drop {
  0% {
    transform: translateY(80%); 
    opacity:.6; 
  }
  80% {
    transform: translateY(80%); 
    opacity:.6; 
  }
  90% { 
    transform: translateY(10%) ; /*上升到原位置的10%的垂直位置*/
    opacity:.6; 
  }
  100% { 
    transform: translateY(0%) scale(1.5);
    stroke-width:0.2;  /*描边*/
    opacity:0; 
  }
}
@keyframes wave {
  to {transform: translateX(-100%);}  
}
@keyframes ball {
  to {transform: translateY(20%);}   
}
</style>
