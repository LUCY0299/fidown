<template>
    <h1>UploadFile...</h1>
    <div 
        @dragenter.prevent="toggleActive" 
        @dragleave.prevent="toggleActive"
        @dragover.prevent            
        @drop.prevent="handleDropFunc"
        :class="{ 'active-dropzone': active }"         
        class="dropzone">

        <span>Drag or Drop File</span>
        <span>OR</span>
        <label for="dropzoneFile">Select File</label>
        <input type="file" id="dropzoneFile" 
        class="dropzoneFile" 
        @change="onFileChangeFunc"/>
    </div>                                                      
    <div class="download-info">
        <li><b>Loaded:</b> {{ (loaded / 1000 / 1000).toFixed(2) }} MB</li>
        <li><b>Total:</b> {{ (total / 1000 / 1000).toFixed(2) }} MB</li>
        <li><b>Timer:</b> {{ timer.toFixed(2) }} s </li>
        <li><b>Speed:</b> {{ (speed * 8 / 1000 / 1000).toFixed(2) }} Mbps</li>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue"
import { handleDrop,onFileChange } from '@/router/index.js';
import { loaded, total, timer, speed, resetProgress, updateProgress } from '@/router/index.js';

  //追蹤拖拽區域是否觸發
const emit = defineEmits(['fileDropped'])

const active = ref(false)  
const toggleActive = () => {
    active.value = !active.value  //true
}

const callbacks = { resetProgress, updateProgress , startTime: Date.now()};
const handleDropFunc = handleDrop(active, emit, callbacks);
const onFileChangeFunc = onFileChange(emit, callbacks);
</script>

<style scoped>
.dropzone{
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;
    border: 2px dashed #41b883;
    background-color: #fff;
    transition: 0.3 ease all;

    label{
        padding: 8px 12px;
        color:#fff;
        background-color: #41b883;
        transition: .3s ease all;
    }
    input{
        display: none;
    }
}

.active-dropzone{
    color: #fff;
    border-color: #fff;
    background-color: #41b883;

    label{
        background-color: #fff;
        color : #41b883;
    }
}

/* download-info */
.download-info{
  list-style-type: none; 
  text-align: center;
  margin-top: 20px;
  margin-bottom: 100px;
}
.download-info li {
  position: relative; 
  padding: 10px 0;
}

.download-info li::before {
  content: ''; 
  position: absolute;
  left: 0%; 
  right: 0%; 
  top: 0; 
  border-top: 2px solid #c4c0c0ea;
}

.download-info li:first-child::before {
  border-top: none; /* 第一个元素不显示顶部边框 */
}
</style>