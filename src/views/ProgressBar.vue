<template>
  
  <FileBack @updateProgress="handleProgressUpdate"/>

  <div class="Pcontainer">
    <div class="progress">
      <img src="@/assets/character.png" class="progress-image" :style= "{ left: progressWidth + '%' }" >
      <div class="progress-value" :style="{ width: progressWidth + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import FileBack from '@/components/FileBack.vue';
import { ref } from 'vue';


const progressWidth = ref(0)


function smoothUpdate(progress) {
  let start = progressWidth.value || 0;
  let end = progress;
  let duration = 500; // 动画持续时间，单位为毫秒
  let startTime;

  function update(time) {
    if (startTime === undefined) {
      startTime = time;
    }
    const elapsed = time - startTime;
    const fraction = Math.min(elapsed / duration, 1);

    // 使用线性插值计算当前进度
    progressWidth.value = start + (end - start) * fraction;

    if (elapsed < duration) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function handleProgressUpdate(progress){
  smoothUpdate(progress);
}

</script>

<style>

.Pcontainer{
  display: flex;
  justify-content: center;
  min-height: 100vh;
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
  width: 0;
  transition: none;
}
.progress-image{
  position: absolute;
  top: -50px; /* 根據需要調整，使圖片顯示在進度條上方 */
  left: 0; /* 初始位置 */
  transition: none; /* 平滑過渡效果 */
  width: 80px;
  height: auto;
}

</style>