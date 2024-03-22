<template>
    <h1>UploadFile...</h1>
    <div @dragenter.prevent="toggleActive" 
         @dragleave.prevent="toggleActive"
         @dragover.prevent            
         @drop.prevent="handleDrop"
         :class="{ 'active-dropzone': active }"         
         class="dropzone">
        <span>Drag or Drop File</span>
        <span>OR</span>
        <label for="dropzoneFile">Select File</label>
        <input type="file" id="dropzoneFile" class="dropzoneFile" @change="onFileChange"/>
    </div>                                                       <!-- 用戶選擇文件後觸發 -->                 

</template>

<script setup>
import { ref, defineEmits } from "vue"
import { fileDropHandlers }  from '@/router/index.js';


const active = ref(false)    //追蹤拖拽區域是否激活
const emit = defineEmits(['fileDropped'])

const toggleActive = () => {
    active.value = !active.value  //true
}

const handleDrop = fileDropHandlers.handleDrop(active, emit);
const onFileChange = fileDropHandlers.onFileChange(emit);
</script>











<style scoped lang="scss">
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
</style>