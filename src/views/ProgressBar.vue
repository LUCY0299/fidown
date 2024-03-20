<template>
  
  <FileBack @updateProgress="setProgress"/>

  <div class="circle">
    <div
      class="RadialProgress"
      role="progressbar"     
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="progress"
      :style="{ '--progress': progress + '%' }"
    >{{ progress }}%</div>
    <!--role指定角色為進度條; 
        aria-valuemin 和 aria-valuemax 屬性指定進度條的最小值和最大值， aria-valuenow 描述其當前狀態;
        style -> 将 progress 变量的值赋给 CSS 变量 --progress，用于控制圆形进度条的填充度;
        {{ 进度条内部显示当前的进度百分比 }}
    -->
    
  </div>
  <div class="download-info">
    <p>Loaded: {{ (loaded / 1024 / 1024).toFixed(2) }} MB</p>
    <p>Total: {{ (total / 1024 / 1024).toFixed(2) }} MB</p>
    <p>Timer: {{ timer.toFixed(2) }} s </p>
    <p>Speed: {{ (speed * 8 / 1024 / 1024).toFixed(2) }} Mbps</p>
  </div>
</template>

<script setup>
import FileBack from '@/components/FileBack.vue';
import { ref } from 'vue';

const progress = ref(0);
const loaded = ref(0);
const total = ref(0);
const timer = ref(0);
const speed = ref(0);
                      //接收一個對象progress的多個屬性
function setProgress({ progress: newProgress,Loaded,Total,Timer,Speed }) {
  /* progress.value = newProgress;   不直接更新值 */   
  smoothUpdate(newProgress);  // 使用smoothUpdate方法来更新进度
  loaded.value= Loaded;
  total.value = Total;
  timer.value = Timer;
  speed.value = Speed;
}

import { useSmoothUpdate } from '@/router/index.js';
const { smoothUpdate } =useSmoothUpdate(progress); // 传递progress引用
</script>

<style scoped>
.circle {
  display:flex;
  justify-content: center;
}

.RadialProgress {
  --hue: 220;       /*進度條色調*/
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
      hsl(var(--hue) 100% 70%) var(--progress, 0%),
      var(--track-bg) var(--progress, 0%) 100%
    );
    
    mask-image: radial-gradient(      /* 中心空白圓環 */
      transparent var(--holesize),    /*中心*/
      black calc(var(--holesize) + 0.5px)  /*外圍*/
    );
  }
}
.download-info{
  text-align: center;
  margin-top: 20px;
}
</style>