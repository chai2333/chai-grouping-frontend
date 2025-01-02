<template>
    <div class="sidebar">
        <!-- 顶部标题区域 -->
        <div class="header">
            <span class="title">🐕ChaiTeam</span>
        </div>

        <!-- 导航按钮区域 -->
        <div class="menu">
            <button class="nav-button" @click="navigateTo('/home')">首页</button>
            <button class="nav-button" @click="navigateTo('/group-hall')">小组大厅</button>

            <!-- 我的组主导航 -->
            <div class="menu-item">
                <button class="nav-button" @click="toggleMyGroupMenu">
                    我的组（管理组）
                </button>
                <!-- 子导航栏 -->
                <div class="sub-menu" v-if="isMyGroupMenuOpen">
                    <button class="sub-nav-button" @click="navigateTo('/my-group/created')">
                        我创建的组
                    </button>
                    <div class="menu-item">
                        <button class="sub-nav-button" @click="toggleJoinedMenu">
                            我加入的组
                        </button>
                        <!-- 更小的子导航栏 -->
                        <div class="sub-sub-menu" v-if="isJoinedMenuOpen">
                            <button class="sub-sub-nav-button" @click="navigateTo('/my-group/joined/approved')">
                                已入队
                            </button>
                            <button class="sub-sub-nav-button" @click="navigateTo('/my-group/joined/pending')">
                                申请中
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <button class="nav-button" @click="navigateTo('/my-tasks')">我的任务</button>
            <button class="nav-button" @click="navigateTo('/personal-info')">
                个人信息
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 控制子导航栏的展开/收起
const isMyGroupMenuOpen = ref(false);
const isJoinedMenuOpen = ref(false);

const toggleMyGroupMenu = () => {
    isMyGroupMenuOpen.value = !isMyGroupMenuOpen.value;
};

const toggleJoinedMenu = () => {
    isJoinedMenuOpen.value = !isJoinedMenuOpen.value;
};

// 路由跳转
const navigateTo = (path) => {
    router.push(path);
};
</script>

<style scoped>
/* 整体导航栏样式 */
.sidebar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* 左对齐 */
    width: 200px;
    height: 100vh;
    background-color: #eaf3ff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    /* 当导航展开内容较多时支持滚动 */
}

/* 顶部标题区域 */
.header {
    display: flex;
    align-items: center;
    width: 100%;
    /* 确保宽度填满父容器 */
    margin-bottom: 20px;
    /* 与导航按钮区域分隔 */
}

.logo {
    width: 32px;
    height: 32px;
    margin-right: 10px;
}

.title {
    font-size: 18px;
    font-weight: bold;
    color: #007bff;
}

/* 导航按钮区域样式 */
.menu {
    display: flex;
    flex-direction: column;
    width: 100%;
}

/* 主导航按钮样式 */
.nav-button {
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #d7e6fd;
    /* 浅蓝色 */
    border: none;
    border-radius: 16px;
    /* 圆角 */
    margin-bottom: 10px;
    text-align: left;
    width: 100%;
    /* 宽度填满父容器 */
    cursor: pointer;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.nav-button:hover {
    background-color: #b3d4fc;
    /* 浅蓝悬浮色 */
    transform: translateY(-2px);
    /* 悬浮效果 */
}

/* 子导航栏样式 */
.menu-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* 确保宽度一致 */
}

.sub-menu {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    /* 缩进以体现层级关系 */
    width: 90%;
    /* 子导航宽度与父级一致 */
}

.sub-nav-button {
    padding: 8px;
    font-size: 12px;
    background-color: #d7e6fd;
    /* 浅蓝色 */
    border: none;
    border-radius: 16px;
    /* 圆角 */
    margin-bottom: 5px;
    text-align: left;
    width: 100%;
    /* 子按钮宽度一致 */
    cursor: pointer;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.sub-nav-button:hover {
    background-color: #b3d4fc;
    /* 悬浮色 */
    transform: translateY(-2px);
    /* 悬浮效果 */
}

/* 更小的子导航栏样式 */
.sub-sub-menu {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    /* 更小子导航缩进 */
    width: 92%;
}

.sub-sub-nav-button {
    padding: 6px;
    font-size: 11px;
    /* 更小字体 */
    background-color: #d7e6fd;
    border: none;
    border-radius: 16px;
    margin-bottom: 5px;
    text-align: left;
    width: 100%;
    cursor: pointer;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.sub-sub-nav-button:hover {
    background-color: #b3d4fc;
    transform: translateY(-2px);
}
</style>