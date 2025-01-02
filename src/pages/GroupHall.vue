<template>
    <div class="group-hall-container">
        <!-- 顶部区域 -->
        <div class="header">
            <button class="header-button">小组大厅</button>
            <div class="actions">
                <button class="create-button" @click="showModal = true">创建组</button>
            </div>
        </div>

        <!-- 小组展示区域 -->
        <div class="group-list">
            <div class="group-box" v-for="group in groups" :key="group.id" @click="goToDetails(group.id)">
                <h2>{{ group.title }}</h2>
                <p>人数：{{ group.currentMembers }}/{{ group.totalMembers }}</p>
            </div>
        </div>

        <!-- 模态框 -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <h2>创建小组</h2>
                <form @submit.prevent="submitForm">
                    <!-- 组队标题 -->
                    <div class="form-group">
                        <label for="title">组队标题</label>
                        <input id="title" type="text" v-model="form.title" placeholder="请输入组队标题" required />
                    </div>

                    <!-- 当前人数 -->
                    <div class="form-group">
                        <label for="currentMembers">当前人数</label>
                        <input id="currentMembers" type="number" v-model="form.currentMembers" placeholder="请输入当前人数"
                            required />
                    </div>

                    <!-- 总人数 -->
                    <div class="form-group">
                        <label for="totalMembers">总人数</label>
                        <input id="totalMembers" type="number" v-model="form.totalMembers" placeholder="请输入总人数"
                            required />
                    </div>

                    <!-- 是否需要批准 -->
                    <div class="form-group">
                        <label for="approval">是否需要批准</label>
                        <input id="approval" type="checkbox" v-model="form.requiresApproval" />
                    </div>

                    <!-- 组队详情说明 -->
                    <div class="form-group">
                        <label for="details">组队详情说明</label>
                        <textarea id="details" v-model="form.details" placeholder="请输入组队详情说明" rows="4"
                            required></textarea>
                    </div>

                    <!-- 按钮 -->
                    <div class="form-actions">
                        <button type="submit" class="submit-button">提交</button>
                        <button type="button" class="cancel-button" @click="closeModal">
                            取消
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); // 路由对象

// 控制模态框显示状态
const showModal = ref(false);

// 小组列表数据（动态加载）
const groups = ref([]);

// 模拟加载数据
const fetchGroups = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: '前端开发组', currentMembers: 5, totalMembers: 10 },
                { id: 2, title: '机器学习组', currentMembers: 3, totalMembers: 8 },
                { id: 3, title: '产品设计组', currentMembers: 2, totalMembers: 5 },
            ]);
        }, 500); // 模拟延迟
    });
};

// 页面加载时获取小组数据
onMounted(async () => {
    groups.value = await fetchGroups();
});

// 表单数据
const form = ref({
    title: '',
    currentMembers: 0,
    totalMembers: 0,
    requiresApproval: false,
    details: '',
});

// 提交表单方法
const submitForm = () => {
    console.log('提交的表单数据:', form.value);

    // 将新组添加到小组列表中
    groups.value.push({
        id: groups.value.length + 1, // 动态生成 ID
        title: form.value.title,
        currentMembers: form.value.currentMembers,
        totalMembers: form.value.totalMembers,
        requiresApproval: form.value.requiresApproval,
        details: form.value.details,
    });

    // 清空表单
    form.value = {
        title: '',
        currentMembers: 0,
        totalMembers: 0,
        requiresApproval: false,
        details: '',
    };

    // 关闭模态框
    closeModal();
};

// 关闭模态框方法
const closeModal = () => {
    showModal.value = false;
};

// 跳转到小组详情页面方法
const goToDetails = (groupId) => {
    router.push(`/group/${groupId}`);
};
</script>

<style scoped>
/* 页面容器样式 */
.group-hall-container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #eaf3ff;
    height: 100vh;
}

/* 顶部区域样式 */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}

.create-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}

/* 小组列表样式 */
.group-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
}

.group-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
}

.group-box h2 {
    margin-bottom: 8px;
}

.group-box p {
    margin: 0;
    font-size: 14px;
}

/* 模态框样式 */
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
    border-radius: 12px;
    padding: 20px;
    width: 400px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}

.modal h2 {
    font-size: 20px;
    margin-bottom: 20px;
}

/* 表单样式 */
.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.submit-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.cancel-button {
    padding: 8px 16px;
    background-color: #ccc;
    color: black;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0056b3;
}

.cancel-button:hover {
    background-color: #999;
}
</style>
