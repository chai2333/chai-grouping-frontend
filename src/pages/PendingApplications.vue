<!-- <template>
    <div class="pending-applications-container">
        <h1>申请中</h1>
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
    { id: 7, title: '申请中小组A' },
    { id: 8, title: '申请中小组B' },
    { id: 9, title: '申请中小组C' },
]);

// 跳转到小组详情页面方法
const goToDetails = (groupId) => {
    router.push(`/group/${groupId}`);
};
</script>

<style scoped>
.pending-applications-container {
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
</style> -->
