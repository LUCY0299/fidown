<template>
    <div class="container">
      <FileFront />
      <h3>本機上傳檔案給用戶下載⬇</h3>
      <DataBar />
      <button @click="toProgressBar" style="margin-bottom: 10px;">ProgressBar</button>
    </div>
</template>

<script setup>
import "@/assets/viewstyle.css";
import FileFront from '@/components/FileFront.vue';
import DataBar from '@/components/DataBar.vue';

import { useRouter } from 'vue-router';
const router = useRouter();
 
function toProgressBar(){
  router.push({ path: '/ProgressBar', query:{ startDownload:'true' } });
}
</script>