<template>
    <div class="tasks-container">
        <!-- 顶部标题 -->
        <h1 class="title">我的任务</h1>

        <!-- 任务卡片区域 -->
        <div class="tasks-grid">
            <div class="task-card" v-for="task in tasks" :key="task.id">
                <p class="task-group">{{ task.group }}</p>
                <p class="task-desc">{{ task.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
// 示例任务数据
const tasks = [
    { id: 1, group: '所属组A', description: '任务描述1' },
    { id: 2, group: '所属组B', description: '任务描述2' },
    { id: 3, group: '所属组C', description: '任务描述3' },
    { id: 4, group: '所属组D', description: '任务描述4' },
];
</script>

<style scoped>
/* 整体容器样式 */
.tasks-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #eaf3ff;
    /* 背景色 */
    min-height: 100vh;
}

/* 标题样式 */
.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

/* 任务网格样式 */
.tasks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    /* 自动适配列数 */
    gap: 20px;
    /* 卡片之间的间距 */
    width: 100%;
    /* 网格宽度 */
    max-width: 800px;
    /* 限制网格区域宽度 */
}

/* 任务卡片样式 */
.task-card {
    background-color: white;
    border: 1px solid #007bff;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.task-card:hover {
    background-color: #d7e6fd;
    /* 浅蓝悬浮色 */
    border-color: #0056b3;
    /* 加深边框颜色 */
}

.task-group {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #007bff;
}

.task-desc {
    font-size: 14px;
    color: #555;
}
</style>