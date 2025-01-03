<template>
    <div class="login-container">
        <!-- 左侧图片 -->
        <div class="image-section">
            <img src="@/assets/login-image.jfif" alt="登录图片" />
        </div>

        <!-- 右侧登录表单 -->
        <div class="form-section">
            <h1>🐕ChaiTeam</h1>
            <h2>登录</h2>
            <form @submit.prevent="handleLogin">
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

                <!-- 错误提示信息 -->
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

                <!-- 登录按钮 -->
                <div class="form-actions">
                    <button type="submit" class="login-button">登录</button>
                </div>

                <!-- 注册链接 -->
                <p class="register-link">
                    没有账号？<router-link to="/register">立即注册</router-link>
                </p>
            </form>
        </div>
    </div>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/api'; // 引入通用 API 服务


const router = useRouter();

// 登录表单数据
const form = ref({
    username: '',
    password: '',
});

const errorMessage = ref(''); // 错误提示信息

// 登录处理逻辑
const handleLogin = async () => {
    try {
        const response = await api.post('auth/login', form.value); // 使用 POST 方法

        console.log(response);

        const { token, user_id } = response;

        console.log("saved information:",token, user_id);

        localStorage.setItem('token', token); // 保存 token
        localStorage.setItem('user_id', user_id); // 保存 user_id

        // 跳转到首页
        router.push('/home');
    } catch (error) {
        console.error(error.message);
        errorMessage.value = '登录失败，请检查用户名或密码';
    }
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}

/* 容器样式 */
.login-container {
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

.login-button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #0056b3;
}

.register-link {
    margin-top: 20px;
    font-size: 14px;
    color: #555;
}

.register-link a {
    color: #007bff;
    text-decoration: none;
}

.register-link a:hover {
    text-decoration: underline;
}
</style>
