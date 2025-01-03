<template>
    <div class="tasks-container">
        <!-- 顶部标题 -->
        <h1 class="title">我的任务</h1>

        <!-- 任务卡片区域 -->
        <div class="tasks-grid">
            <div class="task-card" v-for="task in tasks" :key="task.task_id" @click="goToTaskDetails(task.task_id)">
                <p class="task-group">{{ task.group_name }}</p>
                <p class="task-desc">{{ task.title }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from '@/services/api';
import router from '@/router';

// 任务列表
const tasks = ref([]);

const getTasks = async () => {
  try{
    const response = await api.get('tasks/user');
    tasks.value = response;
    console.log('获取任务列表成功', tasks.value);
  }catch (error){
    console.error('获取任务列表失败', error);
  }
};

const goToTaskDetails = async (taskId) => {
  router.push(`/task/${taskId}`);
};

onMounted(()=>{
  getTasks();
})

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