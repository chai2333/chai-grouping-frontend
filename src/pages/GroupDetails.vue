<template>
    <div class="group-details-container">
        <h1>{{ group.title }}</h1>
        <p>简介：{{ group.description }}</p>
        <p>成员数：{{ group.members }}</p>
        <button @click="goBack">返回小组大厅</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Mock 数据
const mockGroupDetails = {
    1: { id: 1, title: '前端开发组', description: '讨论前端技术', members: 10 },
    2: { id: 2, title: '机器学习组', description: '分享机器学习知识', members: 8 },
    3: { id: 3, title: '产品设计组', description: '讨论设计原则', members: 5 },
};

const route = useRoute();
const router = useRouter();
const group = ref({}); // 小组详情数据
const loading = ref(true); // 加载状态

// 模拟获取小组详情数据
const fetchGroupDetails = async (id) => {
    try {
        // 模拟延迟
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 如果后端接口未完成，使用 Mock 数据
        const useMockData = true; // 模拟开关
        if (useMockData) {
            group.value = mockGroupDetails[id] || {};
        } else {
            const response = await axios.get(`/api/groups/${id}`); // 预留后端接口
            group.value = response.data;
        }
    } catch (error) {
        console.error('加载小组详情失败:', error);
    } finally {
        loading.value = false;
    }
};

// 页面加载时获取小组详情
onMounted(() => {
    const groupId = route.params.id;
    fetchGroupDetails(groupId);
});

// 返回小组大厅
const goBack = () => {
    router.push('/group-hall');
};
</script>

<style scoped>
.group-details-container {
    padding: 20px;
    background-color: #eaf3ff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
