<template>
    <div class="joined-groups">
        <h1>已加入的组</h1>

        <!-- 组列表 -->
        <div class="group-list">
            <div v-for="group in joinedGroups" :key="group.group_id" class="group-item"
                @click="goToGroupDetails(group.group_id)">
                <h2>{{ group.name }}</h2>
                <p>描述：{{ group.description }}</p>
                <p>成员：{{ group.member_count }} / {{ group.volume }}</p>
                <p>加入时间：{{ formatDate(group.join_date) }}</p>
            </div>
        </div>

        <!-- 如果没有已加入的组，显示提示信息 -->
        <div v-if="joinedGroups.length === 0" class="empty-message">
            <p>你还没有加入任何组。</p>
        </div>
    </div>
</template>





<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/api'; // 引入通用 API 服务

const router = useRouter();

// 已加入的组列表
const joinedGroups = ref([]);

// 获取用户已加入的组
const fetchJoinedGroups = async () => {
    try {
        const response = await api.get('groups'); // 调用 `/api/groups` 接口获取所有组

        // 筛选非组长的组（已加入的组）
        joinedGroups.value = response.filter((group) => group.is_leader === 0);
    } catch (error) {
        console.error('获取已加入的组失败:', error.message);
    }
};

// 跳转到组详情页面
const goToGroupDetails = (groupId) => {
    router.push(`/group/${groupId}`);
};

// 格式化日期
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

// 初始化加载已加入的组
onMounted(() => {
    fetchJoinedGroups();
});
</script>





<style scoped>
.joined-groups {
    padding: 20px;
}

h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.group-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.group-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
    cursor: pointer;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.group-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.empty-message {
    text-align: center;
    color: #888;
    font-size: 16px;
}
</style>
