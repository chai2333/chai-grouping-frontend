<template>
    <!-- 顶部导航栏 -->
    <header v-if="!isAuthPage" class="app-header">
      <!-- 左侧 Logo -->
      <div class="logo">
        <span>🐕ChaiTeam</span>
      </div>

      <!-- 用户信息区域 -->
      <div class="user-info">
        <!-- 问候语 -->
        <div class="greeting">
          你好，<span class="username">{{ username }}</span>
        </div>

        <!-- 右上角用户头像和菜单 -->
        <div class="user-menu" @click.stop="toggleMenu">
          <div class="user-avatar">{{ username }}</div>
          <div v-if="menuVisible" class="dropdown-menu">
            <div class="menu-item" @click="handleMenuItemClick(goToProfile)">个人信息</div>
            <div class="menu-item" @click="handleMenuItemClick(logout)">退出</div>
          </div>
        </div>
      </div>
    </header>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '@/services/api'; // 通用 API 服务
import { onMounted } from 'vue';


const router = useRouter();
const route = useRoute();
const username = ref('游客'); // 用户名
const menuVisible = ref(false); // 控制菜单显示

// 检查是否是登录或注册页面
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register';
});


// 显示/隐藏菜单
const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

// 处理菜单选项点击事件
const handleMenuItemClick = (action) => {
  menuVisible.value = true; // 隐藏菜单
  action(); // 执行传入的操作
};

// 跳转到个人信息页面
const goToProfile = () => {
  router.push('/profile'); // 跳转到个人信息页面
};

// 退出登录
const logout = () => {
  localStorage.removeItem('token'); // 清除 token
  localStorage.removeItem('username'); // 清除用户名
  alert('您已退出登录');
  router.push('/login'); // 跳转到登录页面
};

// 获取真实用户名
const fetchUsername = async () => {
  try {
    const response = await api.get('user/profile'); // 调用后端接口
    username.value = response.username || '游客'; // 更新用户名
    localStorage.setItem('username', username.value); // 保存到本地存储
  } catch (error) {
    console.error('获取用户名失败:', error.message);
    username.value = '游客'; // 如果出错，显示默认值
  }
};

onMounted(() => {
  fetchUsername();
});

</script>

<style scoped>
/* 应用容器样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

/* 顶部导航栏样式 */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 左侧 Logo 样式 */
.logo {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
}

.logo span {
  color: #007bff;
  /* 黄色 */
  font-weight: bold;
}

/* 用户信息区域样式 */
.user-info {
  display: flex;
  align-items: center;
}

/* 左侧问候样式 */
.greeting {
  font-size: 18px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  margin-right: 60px;
  /* 与头像之间的间距 */
}

.username {
  color: rgb(0, 0, 0);
  font-weight: normal;
}

/* 用户头像容器 */
.user-menu {
  position: relative;
  cursor: pointer;
}

/* 用户头像样式 */
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007bff, #6a0dad);
  /* 蓝紫色渐变 */
  color: white;
  /* 白色文字 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  /* 转为大写 */
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* 添加阴影效果 */
}


.user-avatar:hover {
  transform: scale(1.1);
  border-color: #f0f0f0;
}

.user-avatar:active {
  transform: scale(0.95);
}


/* 下拉菜单样式 */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: 50px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 150px;
  z-index: 1000;
}

/* 菜单项样式 */
.menu-item {
  padding: 10px;
  text-align: center;
  cursor: pointer;
  color: #007bff;
  font-weight: bold;
}

.menu-item:hover {
  background-color: #f0f0f0;
}
</style>
