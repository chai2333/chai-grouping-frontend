<template>
    <div class="group-hall">
        <h1>小组大厅</h1>

        <!-- 筛选和智能匹配按钮 -->
        <div class="actions">
            <button class="filter-button" @click="openFilterModal">筛选组</button>
            <button class="match-button" @click="fetchMatchedGroups">智能匹配</button>
        </div>

        <!-- 匹配结果展示 -->
        <div v-if="showMatchResults" class="match-results">
            <h2>智能匹配结果</h2>
            <ul class="group-list">
                <li class="group-item" v-for="group in matchedGroups" :key="group.group_id"
                    @click="goToGroupDetails(group.group_id)">
                    <h3>{{ group.name }}</h3>
                    <p>匹配度：{{ group.rating }}</p>
                    <p>匹配原因：{{ group.reason }}</p>
                </li>
            </ul>
        </div>

        <!-- 如果没有匹配结果 -->
        <p v-if="showMatchResults && !matchedGroups.length" class="no-result">
            暂无匹配结果，请调整条件后再试。
        </p>

        <!-- 组列表 -->
        <div class="group-list">
            <div v-for="group in groups" :key="group.group_id" class="group-item"
                @click="goToGroupDetails(group.group_id)">
                <h2>{{ group.name }}</h2>
                <p>描述：{{ group.description || '暂无描述' }}</p>
                <p>成员：{{ group.current_members }} / {{ group.volume === 0 ? '无成员限制' : group.volume }}</p>
                <p>创建时间：{{ formatDate(group.created_at) }}</p>
            </div>
        </div>

        <!-- 如果没有组，显示提示 -->
        <div v-if="groups.length === 0" class="empty-message">
            <p>暂无小组可显示。</p>
        </div>

        <!-- 筛选模态框 -->
        <div v-if="showFilterModal" class="modal-overlay">
            <div class="modal">
                <h2>筛选组</h2>
                <form @submit.prevent="filterGroups">
                    <div class="form-group">
                        <label for="keyword">关键字</label>
                        <input id="keyword" v-model="filters.keyword" placeholder="请输入关键字" />
                    </div>
                    <div class="form-group">
                        <label for="min-volume">最小人数</label>
                        <input id="min-volume" type="number" v-model="filters.min_volume" />
                    </div>
                    <div class="form-group">
                        <label for="max-volume">最大人数</label>
                        <input id="max-volume" type="number" v-model="filters.max_volume" />
                    </div>
                    <div class="form-group">
                        <label for="created-after">创建时间晚于</label>
                        <input id="created-after" type="date" v-model="filters.created_after" />
                    </div>
                    <div class="form-group">
                        <label for="created-before">创建时间早于</label>
                        <input id="created-before" type="date" v-model="filters.created_before" />
                    </div>
                    <button type="submit" class="submit-button">筛选</button>
                    <button type="button" class="cancel-button" @click="closeFilterModal">取消</button>
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

// 小组列表
const groups = ref([]);
const matchedGroups = ref([]); // 匹配组列表
const showMatchResults = ref(false); // 是否展示匹配结果
const matchCriteria = ref({ keyword: 'string', threshold: 0.6 }); // 匹配条件

// 筛选模态框状态
const showFilterModal = ref(false);

// 筛选条件
const filters = ref({
    keyword: '',
    max_volume: null,
    min_volume: null,
    created_before: null,
    created_after: null,
});

// 获取智能匹配组
const fetchMatchedGroups = async () => {
    try {
        const payload = {
            keyword: matchCriteria.value.keyword,
            threshold: matchCriteria.value.threshold,
        };

        const response = await api.post('groups/match', payload);
        matchedGroups.value = response;
        showMatchResults.value = true;
        console.log('智能匹配成功:', response);
    } catch (error) {
        console.error('智能匹配失败：', error.message);

        if (error.response?.status === 400) {
            alert(error.response.data.message || '请先完善个人简历信息以使用智能匹配功能。');
        } else if (error.response?.status === 503) {
            alert(error.response.data.message || '智能匹配服务暂时不可用，请稍后再试。');
        } else {
            alert('智能匹配失败，请稍后再试！');
        }
    }
};


// 获取所有组或根据筛选条件获取组
const filterGroups = async () => {
    try {
        const payload = {
            ...filters.value,
            created_before: filters.value.created_before
                ? new Date(filters.value.created_before).toISOString()
                : undefined,
            created_after: filters.value.created_after
                ? new Date(filters.value.created_after).toISOString()
                : undefined,
        };
        const response = await api.post('groups/filter', payload);
        groups.value = response;
        console.log('筛选组成功:', response);
        closeFilterModal();
    } catch (error) {
        console.error('筛选组失败:', error.message);
    }
};

// 跳转到组详情
const goToGroupDetails = (groupId) => {
    router.push(`/group/${groupId}`);
};

// 打开筛选模态框
const openFilterModal = () => {
    showFilterModal.value = true;
};

// 关闭筛选模态框
const closeFilterModal = () => {
    showFilterModal.value = false;
};

// 格式化日期
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

// 页面加载时默认空筛选一次
onMounted(() => {
    filterGroups();
});
</script>



<style scoped>
.group-hall-container {
    padding: 20px;
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.filter-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    background-color: #007bff;
    color: white;
}

.filter-button:hover {
    background-color: #0056b3;
}

.match-button {
    background-color: #28a745;
    color: white;
}

.match-button:hover {
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
textarea {
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
