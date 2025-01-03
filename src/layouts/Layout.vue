<template>
    <Header /> <!-- 导入顶部导航栏 -->
    <div class="layout">
        <Sidebar /> <!-- 导入导航栏 -->
        <div class="main-content">
            <router-view /> <!-- 页面内容 -->
        </div>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import Header from '@/components/Header.vue';
</script>

<style scoped>
.layout {
    display: flex;
    height: 100vh;
    /* 让布局填满整个视口高度 */
}

.main-content {
    flex: 1;
    padding: 20px;
    background-color: #f9f9f9;
    overflow-y: auto;
}
</style>