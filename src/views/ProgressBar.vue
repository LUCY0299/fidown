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
    <li><b>Loaded:</b> {{ (loaded / 1024 / 1024).toFixed(2) }} MB</li>
    <li><b>Total:</b> {{ (total / 1024 / 1024).toFixed(2) }} MB</li>
    <li><b>Timer:</b> {{ timer.toFixed(2) }} s </li>
    <li><b>Speed:</b> {{ (speed * 8 / 1024 / 1024).toFixed(2) }} Mbps</li>
  </div>
</template>

<script setup>
import "@/assets/viewstyle.css";
import { onMounted,ref } from 'vue';
import { useRoute } from "vue-router";
import { useBackFiles } from '@/router/index.js';
//@=src
import { smoothUpdate } from '@/router/index.js';

const route = useRoute();

const schedule = ref(0); //用來存進度條進度
const loaded = ref(0);
const total = ref(0);
const timer = ref(0);
const speed = ref(0);

/* schedule.value=0; */
function setReset(){
  schedule.value = 0;
  loaded.value = 0;
  total.value = 0;
  timer.value = 0;
  speed.value = 0;
}
                      //避免重名
function setProgress({ progress: newProgress,Loaded,Total,Timer,Speed }) {
  /* progress.value = newProgress;   不直接更新值 */   
  smoothUpdate( schedule, newProgress);  // 使用smoothUpdate方法来更新进度
  loaded.value= Loaded;
  total.value = Total;
  timer.value = Timer;
  speed.value = Speed;
}
const downloadBackFiles = useBackFiles({
  resetProgress: setReset,
  updateProgress: setProgress,
});

onMounted(() => {
    // 檢查URL參數是否指定了startDownload
    if (route.query.startDownload === 'true') {
        downloadBackFiles(); // 如果是，則執行下載
    }
  });
</script>

