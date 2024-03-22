<template>
    <div class="filedrop">
        <UpFile @fileDropped="drop"/>
        <span class="file-info">File: {{ dropzoneFile.name }}</span>
    </div>
   
</template>

<script setup>
import UpFile from "@/components/UpFile.vue"
import { ref } from "vue"

const dropzoneFile = ref("")
const drop = (file) =>{
    dropzoneFile.value = file
}
</script>

<style scoped>
.filedrop{
    height:100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;

    h1{
        font-size: 40px;
        margin-bottom: 32px;
    }

    .file-info{
        margin-top: 32px;
    }
}
</style>