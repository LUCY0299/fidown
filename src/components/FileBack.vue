<template>
  <div class="container">
    <div class="about">
      <h3>後端上傳本機檔案給用戶下載</h3>
    </div>
    <div class="wrap">
      <a class="btn-11" href="#" @click="downloadBackFiles">Click to Download</a>
    </div>                                 
  </div>
</template>

<script setup>
import { useBackFiles } from '@/router/index.js';
import { defineEmits } from 'vue';
// 定義 emit
const emit = defineEmits(['updateProgress']);
// 傳遞 emit 給 useBackFiles 函數
const { downloadBackFiles } = useBackFiles(emit);
</script>

<style scoped>

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
</style>