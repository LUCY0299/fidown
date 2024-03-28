<template>
    <h1>UploadFile...</h1>
    <div @dragenter.prevent="toggleActive" 
         @dragleave.prevent="toggleActive"
         @dragover.prevent            
         @drop.prevent="handleDropFunc"
         :class="{ 'active-dropzone': active }"         
         class="dropzone">
        <span>Drag or Drop File</span>
        <span>OR</span>
        <label for="dropzoneFile">Select File</label>
        <input type="file" id="dropzoneFile" class="dropzoneFile" @change="onFileChangeFunc"/>
    </div>                                                       <!-- 用戶選擇文件後觸發 -->                 

    <div class="download-info">
        <li><b>Loaded:</b> {{ (loaded / 1000 / 1000).toFixed(2) }} MB</li>
        <li><b>Total:</b> {{ (total / 1000 / 1000).toFixed(2) }} MB</li>
        <li><b>Timer:</b> {{ timer.toFixed(2) }} s </li>
        <li><b>Speed:</b> {{ (speed * 8 / 1000 / 1000).toFixed(2) }} Mbps</li>
    </div>
</template>

<script setup>
/* import "@/assets/viewstyle.css"; */
import { ref, defineEmits } from "vue"
import { handleDrop,onFileChange } from '@/router/index.js';


const active = ref(false)    //追蹤拖拽區域是否激活
const emit = defineEmits(['fileDropped'])

const toggleActive = () => {
    active.value = !active.value  //true
}

// 定义状态
const progress = ref(0);
const loaded = ref(0);
const total = ref(0);
const timer = ref(0);
const speed = ref(0);

// 定义回调函数
function resetProgress() {
  progress.value = 0;
  loaded.value = 0;
  total.value = 0;
  timer.value = 0;
  speed.value = 0;
}

function updateProgress({ progress: p, loaded: l, total: t, timer: tm, speed: s }) {
  progress.value = p;
  loaded.value = l;
  total.value = t;
  timer.value = tm;
  speed.value = s;
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
  list-style-type: none; /* 禁用列表項目前的圓點 */
  text-align: center;
  margin-top: 20px;
  margin-bottom: 100px;
}
.download-info li {
  position: relative; /* 使得伪元素可以相对于此元素定位 */
  padding: 10px 0;
}

.download-info li::before {
  content: ''; 
  position: absolute;
  left: 0%; 
  right: 0%; 
  top: 0; 
  border-top: 2px solid #c4c0c0ea; /* 边框样式 */
}

.download-info li:first-child::before {
  border-top: none; /* 第一个元素不显示顶部边框 */
}
</style>