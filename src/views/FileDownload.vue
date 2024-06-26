<template>
    <div class="container">
      <DataBar />
      <button @click="toProgressBar" style="margin-bottom: 10px;">Click to Download</button>
    </div>
</template>

<script setup>
import DataBar from '@/components/DataBar.vue';

import { useRouter } from 'vue-router';
const router = useRouter();
 
function toProgressBar(){
  router.push({ path: '/ProgressBar', query:{ startDownload:'true' } });
}
</script>

<style scoped>
.container {
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
}
</style>