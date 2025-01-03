<template>
    <div class="notifications-container">
        <!-- 返回按钮 -->
        <button class="back-button" @click="goToHome">返回主页</button>

        <!-- 标题 -->
        <h1 class="title">通知列表</h1>

        <!-- 快速标记已读 -->
        <button class="mark-all-read-button" @click="markAllAsRead">标记全部为已读</button>

        <!-- 通知列表 -->
        <ul class="notification-list">
            <li class="notification-item" v-for="notification in notifications" :key="notification.notification_id"
                @click="viewNotification(notification.notification_id)" :class="{ unread: !notification.read }">
                <!-- 通知标题 -->
                <p class="notification-title">{{ notification.title }}</p>

                <!-- 通知时间 -->
                <p class="notification-time">{{ formatTime(notification.create_time) }}</p>

                <!-- 通知状态 -->
                <p v-if="notification.joinRequest" class="notification-status">
                    状态: {{ formatStatus(notification.joinRequest.status) }}
                </p>


            </li>
        </ul>

        <!-- 如果没有通知 -->
        <div v-if="notifications.length === 0" class="empty-message">
            暂无通知
        </div>

        <!-- 通知详情模态框 -->
        <div v-if="showDetailsModal" class="modal-overlay">
            <div class="modal">
                <h2>{{ notificationDetail.title }}</h2>
                <p v-if="notificationDetail.join_request">
                    <strong></strong> {{ notificationDetail.content }}<br />
                    <strong>申请描述：</strong> {{ notificationDetail.join_request.description }}<br />
                </p>
                <p v-else>
                    {{ notificationDetail.content }}
                </p>

                <!-- 审批按钮 -->
                <div v-if="notificationDetail.join_request && notificationDetail.join_request.status === 'PENDING'">
                    <button class="approve-button" @click="respondToRequest('APPROVE')">同意</button>
                    <button class="reject-button" @click="respondToRequest('REJECT')">拒绝</button>
                </div>
                <div
                    v-else-if="notificationDetail.join_request && notificationDetail.join_request.status !== 'PENDING'">
                    <p>审批状态: {{ formatStatus(notificationDetail.join_request.status) }}</p>
                </div>
                <button class="close-button" @click="closeDetailsModal">关闭</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/api'; // 通用 API 服务

const router = useRouter();

// 通知列表
const notifications = ref([]);

// 通知详情
const notificationDetail = ref();

// 是否显示通知详情模态框
const showDetailsModal = ref(false);

// 返回主页的方法
const goToHome = () => {
    router.push('/home'); // 跳转到主页
};

// 获取通知列表的方法
const fetchNotifications = async () => {
    try {
        const response = await api.get('notifications');
        notifications.value = response;
        console.log('通知列表：', response);
        console.log(notifications.create_time);
    } catch (error) {
        console.error('获取通知列表失败：', error.message);
        alert('加载通知列表失败，请稍后再试！');
    }


};

// 快速标记所有通知为已读
const markAllAsRead = async () => {
    try {
        const response = await api.put('notifications/read-all');
        console.log('快速标记已读响应：', response);
        alert(response.message || '所有通知已标记为已读');
        fetchNotifications(); // 刷新通知列表
    } catch (error) {
        console.error('标记所有通知为已读失败：', error.message);
        alert('标记失败，请稍后再试！');
    }
};

// 查看通知详情
const viewNotification = async (notification_id) => {

    try {
        // 获取通知详情
        const response = await api.get(`notifications/${notification_id}`);
        notificationDetail.value = response;
        console.log('通知详情：', response);

        // 打开模态框
        showDetailsModal.value = true;
    } catch (error) {
        console.error('查看通知详情失败:', error.message);
        alert('加载通知详情失败，请稍后再试！');
    }
};

// 审批加入请求的方法
const respondToRequest = async (action) => {
    try {
        if (!notificationDetail.value.join_request) {
            alert('当前通知不是加入申请，无法审批');
            return;
        }

        const joinRequestId = notificationDetail.value.join_request.join_request_id;
        const response = await api.post(`groups/${joinRequestId}/respond`, { action });

        alert(response.message || `申请已${action === 'APPROVE' ? '同意' : '拒绝'}`);

        // 更新通知详情中的申请状态
        notificationDetail.value.join_request.status = action.toLowerCase();

        // 可选：刷新通知列表
        fetchNotifications();

        // 关闭模态框
        closeDetailsModal();
    } catch (error) {
        console.error('审批申请失败:', error.message);
        alert(error.response?.data?.message || '审批失败，请稍后再试！');
    }
};


// 关闭模态框
const closeDetailsModal = () => {
    showDetailsModal.value = false;
    notificationDetail.value = {};
};

// 格式化时间
const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString();
};

// 格式化状态
const formatStatus = (status) => {
    const statusMap = {
        PENDING: '待审批',
        APPROVED: '已批准',
        REJECTED: '已拒绝',
    };
    return statusMap[status] || '未知状态';
};

// 页面加载时获取通知列表
onMounted(() => {
    fetchNotifications();
});
</script>

<style scoped>
/* 整体容器样式 */
.notifications-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    height: 100vh;
}

/* 返回按钮样式 */
.back-button {
    align-self: flex-start;
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}

.back-button:hover {
    background-color: #0056b3;
}

/* 标题样式 */
.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

/* 快速标记已读按钮 */
.mark-all-read-button {
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}

.mark-all-read-button:hover {
    background-color: #218838;
}

/* 通知列表样式 */
.notification-list {
    list-style: none;
    padding: 0;
    width: 100%;
    max-width: 600px;
}

.notification-item {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 20px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.notification-item.unread {
    background-color: #f2f8ff;
}

.notification-item:hover {
    background-color: #e6f3ff;
}

/* 未读徽标样式 */
.badge {
    display: inline-block;
    background-color: #ff5e5e;
    color: white;
    border-radius: 50%;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    margin-left: 10px;
}

/* 空消息样式 */
.empty-message {
    font-size: 16px;
    color: #999;
    margin-top: 20px;
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
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal h2 {
    margin-bottom: 10px;
}

.modal button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.modal button:hover {
    background-color: #0056b3;
}

.approve-button {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.3s ease;
}

.approve-button:hover {
    background-color: #218838;
}

.reject-button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.reject-button:hover {
    background-color: #c82333;
}

.close-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;
}

.close-button:hover {
    background-color: #0056b3;
}
</style>
