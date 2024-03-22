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
        <a class="btn-11" href="#" @click="downloadUpFiles">Click to Download</a>
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
  import { ref } from 'vue';
  import { downloadUploadFiles , smoothUpdate} from '@/router/index.js';

  const schedule = ref(0);
  const loaded = ref(0);
  const total = ref(0);
  const timer = ref(0);
  const speed = ref(0);
 
  function setReset(){
    schedule.value = 0;
    loaded.value = 0;
    total.value = 0;
    timer.value = 0;
    speed.value = 0;
  }
  function setProgress({ progress: newProgress,Loaded,Total,Timer,Speed }) {
    smoothUpdate( schedule, newProgress);  
    loaded.value= Loaded;
    total.value = Total;
    timer.value = Timer;
    speed.value = Speed;
  }
  const downloadUpFiles = () => {
  downloadUploadFiles({
    resetProgress: setReset,
    updateProgress: setProgress,
  });
  };
</script>
  
  