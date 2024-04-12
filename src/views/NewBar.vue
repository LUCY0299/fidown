<template>
  <div class="page-content">
    <div class="circle">
      <div
      class="RadialProgress"
      role="progressbar"     
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="schedule"
      :style="{ '--schedule': schedule + '%' }">
      {{ schedule }}%</div>
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
import { downloadUploadFiles } from '@/router/index.js';
import { schedule, loaded, total, timer, speed, resetProgress, updateProgress } from '@/router/index.js';

// 直接使用返回的函数
const startDownload = downloadUploadFiles({ resetProgress, updateProgress });
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
--hue: 215;       /*進度條色調*/
--holesize: 60%;  /* 進度條寬度 */
--track-bg: hsl(233 34% 92%);  /*進度條背景顏色*/

block-size: 40vmin;       /* 设置进度条的尺寸 */
inline-size: 40vmin;
min-inline-size: 90px;
min-block-size: 90px;
display: grid;            /*  CSS Grid 布局将内容居中 */
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
    transparent var(--holesize),    /*中心*/
    black calc(var(--holesize) + 0.5px)  /*外圍*/
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
  position: relative; /* 使得伪元素可以相对于此元素定位 */
  padding: 10px 0;
}

.download-info li::before {
  content: ''; 
  position: absolute;
  left: 0%; 
  right: 0%; 
  top: 0; 
  border-top: 2px solid #ddddddd7; /* 边框样式 */
}

.download-info li:first-child::before {
  border-top: none; /* 第一个元素不显示顶部边框 */
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
  to {transform: translateX(-100%);}  /*向左100%*/
}
@keyframes ball {
  to {transform: translateY(20%);}   /*向上移动20%*/
}
</style>