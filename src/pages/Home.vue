<template>
    <div class="home-container">
        <!-- 顶部区域 -->
        <div class="header">
            <h1>首页</h1>
            <div class="header-icons">
                <span class="icon" @click="goToNotifications">🔔</span>
            </div>
        </div>

        <!-- 中间功能区域 -->
        <div class="features">
            <div class="feature-box" @click="navigateTo('/my-group')">我的小队</div>
            <div class="feature-box" @click="navigateTo('/group-hall')">组队大厅</div>
            <div class="feature-box" @click="navigateTo('/my-tasks')">我的任务</div>
            <div class="feature-box" @click="navigateTo('/notifications')">最近通知</div>
        </div>


    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

// 跳转到指定路由的方法
const navigateTo = (path) => {
    router.push(path);
};

// 跳转到通知页面
const goToNotifications = () => {
    router.push('/notifications');
};
</script>

<style scoped>
/* 整体容器样式 */
.home-container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #eaf3ff;
    /* 背景色 */
    height: 100%;
}

/* 顶部区域样式 */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header h1 {
    font-size: 24px;
    font-weight: bold;
}

.header-icons {
    display: flex;
    align-items: center;
}

.icon {
    font-size: 24px;
    margin-right: 20px;
    cursor: pointer;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}

/* 中间功能区域样式 */
.features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 两列布局 */
    gap: 16px;
    /* 每个功能块之间的间距 */
    margin-bottom: 20px;
}

.feature-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.feature-box:hover {
    background-color: #d7e6fd;
    border-color: #007bff;
    transform: translateY(-2px);
    /* 悬浮效果 */
}
</style>