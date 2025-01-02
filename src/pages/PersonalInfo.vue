<template>
    <div class="personal-info-container">
        <h1>个人信息</h1>
        <div class="info-grid">
            <!-- 点击对应块时打开模态框 -->
            <div class="info-box" @click="editInfo('name')">
                <p class="info-title">姓名</p>
                <p class="info-value">{{ name }}</p>
            </div>
            <div class="info-box" @click="editInfo('school')">
                <p class="info-title">学校</p>
                <p class="info-value">{{ school }}</p>
            </div>
            <div class="info-box" @click="editInfo('grade')">
                <p class="info-title">年级</p>
                <p class="info-value">{{ grade }}</p>
            </div>
            <div class="info-box" @click="editInfo('profile')">
                <p class="info-title">简历</p>
                <p class="info-value">{{ profile }}</p>
            </div>
            <div class="info-box" @click="editInfo('skillDescription')">
                <p class="info-title">技能描述</p>
                <p class="info-value">{{ skillDescription }}</p>
            </div>
        </div>

        <!-- 模态框 -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <h2>修改 {{ currentFieldTitle }}</h2>
                <form @submit.prevent="saveChanges">
                    <div class="form-group">
                        <label for="value">修改值</label>
                        <input id="value" type="text" v-model="currentValue" placeholder="请输入新的值" required />
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="save-button">保存</button>
                        <button type="button" class="cancel-button" @click="closeModal">取消</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// 用于存储和持久化的字段
const name = ref('');
const school = ref('');
const grade = ref('');
const profile = ref('');
const skillDescription = ref('');

// 从 localStorage 中初始化变量
const loadFromLocalStorage = () => {
    name.value = localStorage.getItem('name') || '张三';
    school.value = localStorage.getItem('school') || '某某大学';
    grade.value = localStorage.getItem('grade') || '大三';
    profile.value = localStorage.getItem('profile') || '我是一个热爱学习的学生';
    skillDescription.value =
        localStorage.getItem('skillDescription') || '擅长编程，熟悉前端开发';
};

// 将变量存储到 localStorage
const saveToLocalStorage = () => {
    localStorage.setItem('name', name.value);
    localStorage.setItem('school', school.value);
    localStorage.setItem('grade', grade.value);
    localStorage.setItem('profile', profile.value);
    localStorage.setItem('skillDescription', skillDescription.value);
};

// 页面加载时从 localStorage 初始化变量
onMounted(() => {
    loadFromLocalStorage();
});

// 监听变量变化，实时保存到 localStorage
watch([name, school, grade, profile, skillDescription], saveToLocalStorage);

// 模态框相关状态
const showModal = ref(false);
const currentField = ref('');
const currentFieldTitle = ref('');
const currentValue = ref('');

// 打开模态框并编辑对应字段
const editInfo = (field) => {
    currentField.value = field;

    switch (field) {
        case 'name':
            currentFieldTitle.value = '姓名';
            currentValue.value = name.value;
            break;
        case 'school':
            currentFieldTitle.value = '学校';
            currentValue.value = school.value;
            break;
        case 'grade':
            currentFieldTitle.value = '年级';
            currentValue.value = grade.value;
            break;
        case 'profile':
            currentFieldTitle.value = '简介';
            currentValue.value = profile.value;
            break;
        case 'skillDescription':
            currentFieldTitle.value = '技能描述';
            currentValue.value = skillDescription.value;
            break;
    }

    showModal.value = true;
};

// 保存修改
const saveChanges = () => {
    switch (currentField.value) {
        case 'name':
            name.value = currentValue.value;
            break;
        case 'school':
            school.value = currentValue.value;
            break;
        case 'grade':
            grade.value = currentValue.value;
            break;
        case 'profile':
            profile.value = currentValue.value;
            break;
        case 'skillDescription':
            skillDescription.value = currentValue.value;
            break;
    }

    closeModal();
};

// 关闭模态框
const closeModal = () => {
    showModal.value = false;
};
</script>

<style scoped>
/* 页面样式 */
.personal-info-container {
    padding: 20px;
    background-color: #eaf3ff;
    height: 100vh;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}

.info-box {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.info-box:hover {
    background-color: #d7e6fd;
    transform: translateY(-2px);
}

.info-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
}

.info-value {
    font-size: 14px;
    color: #555;
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
    margin-bottom: 20px;
    font-size: 20px;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
}

.form-group input {
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

.save-button {
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

.save-button:hover {
    background-color: #0056b3;
}

.cancel-button:hover {
    background-color: #999;
}
</style>
