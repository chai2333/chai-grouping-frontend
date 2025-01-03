<template>
    <div class="profile-container">
        <h1>个人信息</h1>

        <!-- 账户信息 -->
        <section class="section">
            <h2>账户信息</h2>
            <form @submit.prevent="updateProfile">
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input id="username" type="text" v-model="profile.username" placeholder="请输入用户名" />
                </div>
                <div class="form-group">
                    <label for="profile">个人简介</label>
                    <textarea id="profile" v-model="profile.profile" placeholder="请输入个人简介" rows="4"></textarea>
                </div>
                <button type="submit" class="button">更新账户信息</button>
            </form>
        </section>

        <!-- 简历信息 -->
        <section class="section">
            <h2>简历信息</h2>
            <form @submit.prevent="updateResume">
                <div class="form-group">
                    <label for="school">学校</label>
                    <input id="school" type="text" v-model="resume.school" placeholder="请输入学校" />
                </div>
                <div class="form-group">
                    <label for="grade">年级</label>
                    <input id="grade" type="text" v-model="resume.grade" placeholder="请输入年级" />
                </div>
                <div class="form-group">
                    <label for="skillDescription">技能描述</label>
                    <textarea id="skillDescription" v-model="resume.skill_description" placeholder="请输入技能描述"
                        rows="4"></textarea>
                </div>
                <button type="submit" class="button">更新简历信息</button>
            </form>
        </section>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { api } from '@/services/api'; // 引入通用 API 服务

// 账户信息
const profile = ref({
    username: '',
    profile: '',
});

// 简历信息
const resume = ref({
    school: '',
    grade: '',
    skill_description: '',
});

// 获取账户信息
const fetchProfile = async () => {
    try {
        const response = await api.get('user/profile');
        profile.value = response;
    } catch (error) {
        console.error('获取账户信息失败:', error.message);
    }
};

// 更新账户信息
const updateProfile = async () => {
    try {
        const response = await api.put('user/profile', profile.value);
        alert(response.message || '账户信息更新成功');
    } catch (error) {
        console.error('更新账户信息失败:', error.message);
        alert(error.message || '更新账户信息失败');
    }
};

// 获取简历信息
const fetchResume = async () => {
    try {
        const response = await api.get('user/resume');
        resume.value = response;
    } catch (error) {
        console.error('获取简历信息失败:', error.message);
    }
};

// 更新简历信息
const updateResume = async () => {
    try {
        const response = await api.put('user/resume', resume.value);
        alert(response.message || '简历更新成功');
    } catch (error) {
        console.error('更新简历信息失败:', error.message);
        alert(error.message || '更新简历信息失败');
    }
};

// 初始化数据
onMounted(() => {
    fetchProfile();
    fetchResume();
});
</script>


<style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #eaf3ff;
    height: 100vh;
}


h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

.section {
    margin-bottom: 40px;
}

h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input,
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

textarea {
    resize: none;
}

.button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.button:hover {
    background-color: #0056b3;
}
</style>
