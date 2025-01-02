<template>
  <div id="app">
    <!-- 全局导航栏 -->
    <header v-if="isLoggedIn" class="app-header">
      <nav>
        <ul>
          <li><router-link to="/home">首页</router-link></li>
          <li><router-link to="/group-hall">小组大厅</router-link></li>
          <li><router-link to="/profile">个人信息</router-link></li>
          <li><a @click="handleLogout">注销</a></li>
        </ul>
      </nav>
    </header>

    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

// 检查用户是否登录
const isLoggedIn = ref(false);
const router = useRouter();

// 检查本地是否有 token
const checkLoginStatus = () => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
};

// 用户注销
const handleLogout = () => {
  localStorage.removeItem('token'); // 清除 token
  isLoggedIn.value = false;
  router.push('/login'); // 跳转到登录页面
};

// 在加载时检查登录状态
checkLoginStatus();

// 监听路由变化
watchEffect(() => {
  checkLoginStatus();
});
</script>

<style scoped>
/* 全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.app-header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.app-header nav ul {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.app-header nav ul li {
  font-size: 16px;
}

.app-header nav ul li a {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.app-header nav ul li a:hover {
  text-decoration: underline;
}
</style>
