<template>
    <div class="notifications-container">
        <!-- 返回按钮 -->
        <button class="back-button" @click="goToHome">返回主页</button>

        <!-- 标题 -->
        <h1 class="title">通知列表</h1>

        <!-- 通知列表 -->
        <ul class="notification-list">
            <li class="notification-item" v-for="notification in notifications" :key="notification.id">
                <p class="notification-title">{{ notification.title }}</p>
                <p class="notification-time">{{ notification.time }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 示例通知数据
const notifications = [
    { id: 1, title: '您已成功加入组A', time: '2025-01-01 10:00' },
    { id: 2, title: '组B发来邀请，请尽快处理', time: '2025-01-02 12:30' },
    { id: 3, title: '您已退出组C', time: '2025-01-03 15:45' },
];

// 返回主页的方法
const goToHome = () => {
    router.push('/home'); // 跳转到主页
};
</script>

<style scoped>
/* 整体容器样式 */
.notifications-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #eaf3ff;
    /* 背景色 */
    height: 100vh;
    /* 填满屏幕高度 */
}

/* 返回按钮样式 */
.back-button {
    align-self: flex-start;
    /* 靠左对齐 */
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.back-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    /* 悬浮效果 */
}

/* 标题样式 */
.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

/* 通知列表样式 */
.notification-list {
    list-style: none;
    padding: 0;
    width: 100%;
    max-width: 600px;
    /* 限制宽度 */
}

.notification-item {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px 20px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.notification-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
}

.notification-time {
    font-size: 14px;
    color: #777;
}
</style>