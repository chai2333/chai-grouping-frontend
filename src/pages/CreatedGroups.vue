<template>
    <div class="created-groups-container">
        <h1>我创建的组</h1>
        <div class="group-list">
            <div class="group-box" v-for="group in groups" :key="group.id" @click="goToDetails(group.id)">
                {{ group.title }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 示例数据
const groups = ref([
    { id: 1, title: '我创建的小组A' },
    { id: 2, title: '我创建的小组B' },
    { id: 3, title: '我创建的小组C' },
]);

// 跳转到小组详情页面方法
const goToDetails = (groupId) => {
    router.push(`/group/${groupId}`);
};
</script>

<style scoped>
.created-groups-container {
    padding: 20px;
    background-color: #eaf3ff;
    height: 100vh;
}

.group-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
}

.group-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

.group-box:hover {
    background-color: #d7e6fd;
}
</style>
