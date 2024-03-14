<template>
    <div class="about">
      <h3>後端上傳本機檔案給用戶下載</h3>
    </div>
    <div class="Filedisplay">
      <button @click="downloadBackFiles">Download pdf</button>
      <div v-if="downloadProgress">Progress: {{ downloadProgress }}%</div>
    </div>
</template>

<script setup>
import { useBackFiles } from '@/router/index.js';
import { defineEmits } from 'vue';
// 定義 emit
const emit = defineEmits(['updateProgress']);
// 傳遞 emit 給 useBackFiles 函數
const { downloadBackFiles, downloadProgress } = useBackFiles(emit);
</script>
