<template>
  <div class="container">

    <div class="wrap">
      <a class="btn-11" href="#" @click="downloadBackFiles">Click to Download</a>
    </div>                                 

    <div class="Pcontainer">
      <div class="progress">
        <img src="@/assets/character.png" class="progress-image" :style= "{ left: progressWidth + '%' }" >
        <div class="progress-value" :style="{ width: progressWidth + '%' }">
          <span class="progress-text">{{ Math.floor(progressWidth) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useBackFiles } from '@/router/index.js';


const progressWidth = ref(0)

function setProgress({ progress }){
  progressWidth.value= progress;
}

function setReset(){
  progressWidth.value = 0;
} 

const downloadBackFiles = useBackFiles({
  resetProgress: setReset,
  updateProgress: setProgress,
});
</script>

<style scoped>

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





.Pcontainer{
  display: flex;
  justify-content: center;
  min-height: 40vh;
  padding: 0;
  margin-top: 100px;
}

.progress {
  background: rgba(44, 32, 32, 0.1);
  justify-content: flex-start;
  border-radius: 100px;
  align-items: center;
  position: relative;
  padding: 0 5px;
  display: flex;
  height: 40px;
  width: 500px;
}

.progress-value {
  animation: load 3s normal forwards;
  box-shadow: 0 10px 40px -10px #750808;
  border-radius: 100px;
  background: #4638c2;
  height: 30px;


  position: relative; /* 定位相对，以便子元素可以正确定位 */
}
.progress-image{
  position: absolute;
  top: -50px; /* 根據需要調整，使圖片顯示在進度條上方 */
  left: 0; /* 初始位置 */
  animation: walking 0.5s ease-in-out infinite;
  width: 80px;
  height: auto;
}
.progress-text {
  color: white; /* 文字顏色 */
  position: absolute; /* 絕對定位 */
  top: 50%; /* 垂直居中 */
  left: 50%; /* 水平居中 */
  transform: translate(-50%, -50%); /* 確保文字完全居中 */
  user-select: none; /* 防止選中文字 */
}


</style>