<template>
    <div class="register-container">
        <!-- 左侧图片 -->
        <div class="image-section">
            <img src="@/assets/register-image.jfif" alt="注册图片" />
        </div>

        <!-- 右侧注册表单 -->
        <div class="form-section">
            <h1>🐕ChaiTeam</h1>
            <h2>注册</h2>
            <form @submit.prevent="handleRegister">
                <!-- 用户名 -->
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input id="username" type="text" v-model="form.username" placeholder="请输入用户名" required />
                </div>

                <!-- 密码 -->
                <div class="form-group">
                    <label for="password">密码</label>
                    <input id="password" type="password" v-model="form.password" placeholder="请输入密码" required />
                </div>

                <!-- 确认密码 -->
                <div class="form-group">
                    <label for="confirmPassword">确认密码</label>
                    <input id="confirmPassword" type="password" v-model="form.confirmPassword" placeholder="请再次输入密码"
                        required />
                </div>

                <!-- 注册按钮 -->
                <div class="form-actions">
                    <button type="submit" class="register-button">注册</button>
                </div>

                <!-- 登录链接 -->
                <p class="login-link">
                    已有账号？<router-link to="/login">立即登录</router-link>
                </p>
            </form>

            <!-- 错误提示 -->
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/api';

const router = useRouter();
const errorMessage = ref(''); // 错误提示信息

// 注册表单数据
const form = ref({
    username: '',
    password: '',
});



const handleRegister = async () => {
    try {
        await api.post('auth/register', form.value);
        alert('注册成功，请登录！');
        router.push('/login');
    } catch (error) {
        console.error(error.message);
        errorMessage.value = '注册失败，可能是用户名已存在';
    }
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}

/* 容器样式 */
.register-container {
    display: flex;
    height: 100vh;
}

/* 左侧图片部分 */
.image-section {
    flex: 1;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.image-section img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 右侧表单部分 */
.form-section {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

.form-group {
    width: 100%;
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.form-actions {
    width: 100%;
    text-align: center;
}

.register-button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.register-button:hover {
    background-color: #218838;
}

.login-link {
    margin-top: 20px;
    font-size: 14px;
    color: #555;
}

.login-link a {
    color: #007bff;
    text-decoration: none;
}

.login-link a:hover {
    text-decoration: underline;
}
</style>
