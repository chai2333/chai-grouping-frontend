<template>
    <div class="created-groups">
        <h1>我创建的组</h1>

        <!-- 创建组按钮 -->
        <div class="actions">
            <button @click="openCreateGroupModal" class="create-button">创建组</button>
        </div>

        <!-- 我创建的组列表 -->
        <div class="group-list">
            <div v-for="group in createdGroups" :key="group.group_id" class="group-item"
                @click="goToGroupDetails(group.group_id)">
                <h2>{{ group.name }}</h2>
                <p>成员：{{ group.member_count }} / {{ group.volume === 0 ? '无成员限制' : group.volume }}</p>
                <p>创建时间：{{ formatDate(group.join_date) }}</p>
                <p class="leader-badge">我是组长</p>
            </div>
        </div>

        <!-- 如果没有创建任何组，显示提示信息 -->
        <div v-if="createdGroups.length === 0" class="empty-message">
            <p>你还没有创建任何组。</p>
        </div>

        <!-- 创建组模态框 -->
        <div v-if="showCreateModal" class="modal-overlay">
            <div class="modal">
                <h2>创建组</h2>
                <form @submit.prevent="createGroup">
                    <div class="form-group">
                        <label for="name">组名</label>
                        <input id="name" v-model="newGroup.name" placeholder="请输入组名" required />
                    </div>
                    <div class="form-group">
                        <label for="description">描述</label>
                        <textarea id="description" v-model="newGroup.description" placeholder="请输入描述"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="volume">最大人数</label>
                        <input id="volume" type="number" v-model="newGroup.volume" required />
                    </div>
                    <div class="form-group">
                        <label for="visibility">是否公开</label>
                        <select id="visibility" v-model="newGroup.visibility">
                            <option :value="1">公开</option>
                            <option :value="0">不公开</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="approval_required">是否需要申请</label>
                        <select id="approval_required" v-model="newGroup.approval_required">
                            <option :value="1">需要申请</option>
                            <option :value="0">直接加入</option>
                        </select>
                    </div>
                    <button type="submit" class="submit-button">提交</button>
                    <button type="button" class="cancel-button" @click="closeCreateGroupModal">取消</button>
                </form>
            </div>
        </div>
    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/api'; // 引入通用 API 服务

const router = useRouter();

// 我创建的组列表
const createdGroups = ref([]);

// 创建组模态框状态
const showCreateModal = ref(false);

// 新建组数据
const newGroup = ref({
    name: '',
    description: '',
    volume: 0,
    visibility: 1, // 默认值：公开（1 表示公开，0 表示不公开）
    approval_required: 1, // 默认值：需要申请（1 表示需要申请，0 表示直接加入）
});

// 获取我创建的组
const fetchCreatedGroups = async () => {
    try {
        const response = await api.get('groups'); // 调用 `/api/groups` 接口获取所有组
        console.log('我创建的组:', response);
        // 筛选我是组长的组
        createdGroups.value = response.filter((group) => group.is_leader === 1);
    } catch (error) {
        console.error('获取我创建的组失败:', error.message);
    }
};

// 创建新组
const createGroup = async () => {
    try {
        console.log('创建组请求体:', newGroup.value); // 打印请求体以调试
        const response = await api.post('groups', newGroup.value); // 创建新组
        alert(response.message || '组已创建');
        closeCreateGroupModal();
        fetchCreatedGroups(); // 刷新列表
    } catch (error) {
        console.error('创建组失败:', error.message);
        alert(error.response?.data?.message || '创建组失败');
    }
};

// 跳转到组详情
const goToGroupDetails = (group_id) => {
    router.push(`/group/${group_id}`);
};

// 打开创建组模态框
const openCreateGroupModal = () => {
    showCreateModal.value = true;
};

// 关闭创建组模态框
const closeCreateGroupModal = () => {
    showCreateModal.value = false;
};

// 格式化日期
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

// 初始化加载我创建的组
onMounted(() => {
    fetchCreatedGroups();
});
</script>




<style scoped>
.created-groups {
    padding: 20px;
}

.actions {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}

.create-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    background-color: #28a745;
    color: white;
}

.create-button:hover {
    background-color: #218838;
}

.group-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.form-group {
    margin-bottom: 15px;
}

input,
textarea,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.submit-button,
.cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.submit-button {
    background-color: #007bff;
    color: white;
}

.cancel-button {
    background-color: #ccc;
    color: black;
}

.submit-button:hover {
    background-color: #0056b3;
}

.cancel-button:hover {
    background-color: #999;
}
</style>
