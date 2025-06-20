<template>
    <div class="group-details">
        <h1>{{ group_details.name }}</h1>
        <p>描述：{{ group_details.description || '暂无描述' }}</p>
        <p>最大人数：{{ group_details.volume === 0 ? '无限制' : group_details.volume }}</p>
        <p>可见性：{{ group_details.visibility === 1 ? '公开' : '私密' }}</p>

        <!-- 组长操作按钮 -->
        <div v-if="is_leader" class="leader-actions">
            <button @click="openEditModal" class="edit-button">编辑</button>
            <button @click="confirmDisbandGroup" class="disband-button">解散小组</button>
        </div>

        <!-- 申请加入小组 -->
        <div v-if="!is_member" class="join-group-section">
            <h3>申请加入该组</h3>
            <textarea v-model="join_request.description" placeholder="请输入申请描述，例如您的技能或意图"></textarea>
            <button class="submit-button" @click="applyToGroup">提交申请</button>
        </div>

        <!-- 成员列表 -->
        <h2>组员列表</h2>
        <div class="member-list">
            <div v-for="member in group_details.members" :key="member.user_id" class="member-item"
                :class="{ leader: member.is_leader === 1 }" @click="fetchMemberDetails(member.user_id)">
                <span>{{ member.username.slice(-3) }}</span>
                <!-- 踢出按钮，仅对组长可见且不能踢出其他组长 -->
                <button v-if="is_leader && member.is_leader !== 1" class="kick-button"
                    @click.stop="kickMember(member.user_id)">
                    踢出
                </button>
            </div>
        </div>

        <!-- 转移组长并退出按钮 -->
        <button v-if="is_leader" class="transfer-leader-button" @click="openTransferModal">
            转移组长并退出
        </button>

        <!-- 转移组长模态框 -->
        <div v-if="showTransferModal" class="modal-overlay">
            <div class="modal">
                <h2>转移组长</h2>
                <form @submit.prevent="transferLeader">
                    <div class="form-group">
                        <label for="new-leader">选择新组长</label>
                        <select id="new-leader" v-model="newLeaderId" required>
                            <option v-for="member in group_details.members.filter((m) => m.user_id !== current_user_id)"
                                :key="member.user_id" :value="member.user_id">
                                {{ member.username }}
                            </option>
                        </select>
                    </div>
                    <button type="submit" class="submit-button">确认转移并退出</button>
                    <button type="button" class="cancel-button" @click="closeTransferModal">取消</button>
                </form>
            </div>
        </div>

        <!-- 组员详情模态框 -->
        <div v-if="show_member_modal" class="modal-overlay">
            <div class="modal">
                <h2>组员详情</h2>
                <p><strong>用户名：</strong> {{ member_details.username }}</p>
                <p><strong>角色：</strong> {{ member_details.role === 'leader' ? '组长' : '组员' }}</p>
                <p><strong>加入时间：</strong> {{ formatDate(member_details.join_date) }}</p>
                <p><strong>学校：</strong> {{ member_details.school || '暂无信息' }}</p>
                <p><strong>年级：</strong> {{ member_details.grade || '暂无信息' }}</p>
                <p><strong>技能描述：</strong> {{ member_details.skill_description || '暂无信息' }}</p>
                <div class="form-actions">
                    <button type="button" class="cancel-button" @click="closeMemberModal">关闭</button>
                </div>
            </div>
        </div>
        <!-- 编辑模态框 -->
        <div v-if="show_edit_modal" class="modal-overlay">
            <div class="modal">
                <h2>编辑小组</h2>
                <form @submit.prevent="updateGroup">
                    <!-- 组名 -->
                    <div class="form-group">
                        <label for="name">组名</label>
                        <input id="name" v-model="edit_form.name" placeholder="请输入组名" required />
                    </div>
                    <!-- 描述 -->
                    <div class="form-group">
                        <label for="description">描述</label>
                        <textarea id="description" v-model="edit_form.description" placeholder="请输入描述"></textarea>
                    </div>
                    <!-- 最大人数 -->
                    <div class="form-group">
                        <label for="volume">最大人数</label>
                        <input id="volume" type="number" v-model="edit_form.volume" required />
                    </div>
                    <!-- 可见性 -->
                    <div class="form-group">
                        <label for="visibility">可见性</label>
                        <select id="visibility" v-model="edit_form.visibility">
                            <option :value="1">公开</option>
                            <option :value="0">私密</option>
                        </select>
                    </div>
                    <!-- 是否需要批准 -->
                    <div class="form-group">
                        <label for="approval_required">需要批准加入</label>
                        <select id="approval_required" v-model="edit_form.approval_required">
                            <option :value="1">是</option>
                            <option :value="0">否</option>
                        </select>
                    </div>
                    <!-- 按钮 -->
                    <div class="form-actions">
                        <button type="submit" class="submit-button">保存</button>
                        <button type="button" class="cancel-button" @click="closeEditModal">取消</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="is_member">
            <h2>小组任务</h2>
            <button v-if="is_leader" class="create-task-button"
                @click="((showCreateTaskModal = true), (reassigning = false))">
                创建任务
            </button>

            <!-- 创建任务模态框 -->
            <div v-if="showCreateTaskModal" class="modal-overlay">
                <div class="modal">
                    <h2>创建任务</h2>
                    <form>
                        <div class="form-group">
                            <label for="task-title">任务标题</label>
                            <input id="task-title" v-model="taskEditting.title" placeholder="请输入任务标题"
                                :disabled="reassigning" required />
                        </div>
                        <div class="form-group">
                            <label for="task-description">任务描述</label>
                            <textarea id="task-description" v-model="taskEditting.description" :disabled="reassigning"
                                placeholder="请输入任务描述"></textarea>
                        </div>
                        <button @click="smartMatch" class="smart-match-button">智能匹配</button>
                        <p>{{ smartMatchReason }}</p>
                        <div class="form-group">
                            <label for="task-deadline">截止日期</label>
                            <input id="task-deadline" type="date" v-model="taskEditting.deadline" />
                        </div>
                        <div class="form-group">
                            <label for="task-assignee">分配给</label>
                            <select id="task-assignee" v-model="taskEditting.assignee_id">
                                <option v-for="member in group_details.members" :key="member.user_id"
                                    :value="member.user_id">
                                    {{ member.username }}
                                </option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button v-if="!reassigning" type="submit" class="submit-button" @click="createTask">
                                创建
                            </button>
                            <button v-else class="submit-button" @click="reassignTask">重新分配</button>
                            <button type="button" class="cancel-button" @click="showCreateTaskModal = false">
                                取消
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="task-list">
                <!-- 任务卡片区域 -->
                <div class="tasks-grid">
                    <div class="task-card" v-for="task in tasks" :key="task.task_id"
                        @click="goToTaskDetails(task.task_id)">
                        <p class="task-desc">{{ task.title }}</p>
                        <p><strong>截至日期</strong>{{ new Date(task.deadline).toLocaleDateString() }}</p>
                        <p><strong>负责人</strong>{{ task.username }}</p>
                        <p><strong>状态</strong>{{ task.state }}</p>
                        <button v-if="is_leader" @click="showReassignModal($event, task)">重新分配</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/services/api';

const route = useRoute();
const router = useRouter();
const group_id = route.params.group_id;
// 当前用户的 ID
const current_user_id = parseInt(localStorage.getItem('user_id'), 10);
// 状态
const showTransferModal = ref(false); // 控制转移组长模态框的显示
const newLeaderId = ref(null); // 存储选中的新组长 ID
// 申请加入小组状态
const join_request = ref({
    description: '',
});
// 打开转移组长模态框
const openTransferModal = () => {
    showTransferModal.value = true;
};

// 关闭转移组长模态框
const closeTransferModal = () => {
    showTransferModal.value = false;
    newLeaderId.value = null; // 重置选中的组长
};

// 转移组长并退出
const transferLeader = async () => {
    if (!newLeaderId.value) {
        alert('请选择新的组长！');
        return;
    }

    try {
        const response = await api.post(`groups/${group_id}/leader_leave`, {
            new_leader_id: newLeaderId.value
        });
        alert(response.message || '已成功转移组长并退出该组');

        // 跳转回“我创建的组”页面
        router.push('/my-group/created');
    } catch (error) {
        console.error('转移组长失败:', error.message);
        alert(error.response?.data?.message || '转移组长失败，请稍后再试');
    } finally {
        closeTransferModal();
    }
};


// 是否为小组成员
const is_member = computed(() => {
    console.log('当前用户 ID:', current_user_id);

    if (!group_details.value.members || group_details.value.members.length === 0) {
        console.log('成员列表未加载或为空:', group_details.value.members);
        return false; // 如果成员列表未加载或为空，返回 false
    }

    const member = group_details.value.members.find((member) => member.user_id === current_user_id);
    console.log('当前用户是否是小组成员:', !!member);
    return !!member; // 如果找到用户则返回 true，否则返回 false
});

// 踢出组员
const kickMember = async (userId) => {
    if (!confirm('您确定要踢出该成员吗？')) return;

    try {
        const response = await api.delete(`groups/${group_id}/members/${userId}/remove`);
        alert(response.message || '已成功将成员移出该组');

        // 更新成员列表
        await fetchGroupDetails();
    } catch (error) {
        console.error('踢出成员失败:', error.message);
        alert(error.response?.data?.message || '踢出成员失败，请稍后再试');
    }
};

// 控制模态框显示状态
const show_member_modal = ref(false);

// 当前组员的详情数据
const member_details = ref({});

// 提交加入小组申请方法
const applyToGroup = async () => {
    console.log('join_request 对象:', join_request.value);
    console.log('申请描述原始值:', join_request.value.description);
    console.log('去掉空格后的值:', join_request.value.description?.trim());
    // 确保 join_request.description 存在并为字符串
    const description = join_request.value.description?.trim() || '';

    if (!description) {
        alert('请输入申请描述！');
        return;
    }

    try {
        const response = await api.post(`groups/${group_id}/apply`, { description });
        alert(response.message || '申请已发送');
        join_request.value.description = ''; // 清空输入框
    } catch (error) {
        console.error('提交加入组申请失败:', error.message);
        alert(error.response?.data?.message || '提交申请失败，请稍后再试');
    }
};



// 获取组员详情的方法
const fetchMemberDetails = async (userId) => {
    try {
        const response = await api.get(`groups/${group_id}/${userId}`);
        member_details.value = response; // 保存返回的组员详情
        show_member_modal.value = true; // 显示模态框
    } catch (error) {
        console.error('加载组员详情失败:', error.message);
        alert(error.response?.data?.message || '加载组员详情失败，请稍后再试');
    }
};

// 关闭组员详情模态框
const closeMemberModal = () => {
    show_member_modal.value = false;
};

// 格式化日期
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};


// 小组详情数据
const group_details = ref({
    group_id: null,
    name: '',
    description: '',
    volume: 0,
    visibility: 1,
    members: []
});

// 是否为组长
const is_leader = computed(() => {
    const leader = group_details.value.members.find(
        (member) => parseInt(member.is_leader) === 1 && member.user_id === current_user_id
    );
    return !!leader;
});

// 编辑模态框状态
const show_edit_modal = ref(false);
const edit_form = ref({
    name: '',
    description: '',
    volume: 0,
    visibility: 1,
    approval_required: 1
});

// 打开编辑模态框
const openEditModal = () => {
    edit_form.value = {
        name: group_details.value.name,
        description: group_details.value.description,
        volume: group_details.value.volume,
        visibility: group_details.value.visibility,
        approval_required: group_details.value.approval_required
    };
    show_edit_modal.value = true;
};

// 关闭编辑模态框
const closeEditModal = () => {
    show_edit_modal.value = false;
};

// 更新小组信息
const updateGroup = async () => {
    try {
        const payload = { ...edit_form.value };
        const response = await api.put(`groups/${group_id}`, payload);
        alert(response.message || '小组信息已更新');
        show_edit_modal.value = false; // 关闭模态框
        fetchGroupDetails(); // 刷新小组详情
    } catch (error) {
        console.error('更新小组失败：', error.message);
        alert(error.response?.data?.message || '更新失败，请稍后再试');
    }
};

// 获取小组详情
const fetchGroupDetails = async () => {
    try {
        const response = await api.get(`groups/${group_id}`);
        group_details.value = response;
    } catch (error) {
        console.error('获取小组详情失败：', error.message);
        alert('加载小组详情失败，请稍后再试');
    }
};

// 解散小组
const disbandGroup = async () => {
    try {
        const response = await api.delete(`groups/${group_id}`);
        alert(response.message || '小组已解散');
        router.push('/group-hall'); // 跳转回小组大厅页面
    } catch (error) {
        if (error.response?.status === 403) {
            alert('您无权解散此小组');
        } else {
            console.error('解散小组失败：', error.message);
            alert(error.response?.data?.message || '解散失败，请稍后再试');
        }
    }
};

// 确认解散小组
const confirmDisbandGroup = () => {
    if (confirm('确定要解散该小组吗？此操作无法撤销')) {
        disbandGroup();
    }
};

const tasks = ref([]);
const showCreateTaskModal = ref(false);
const taskEditting = ref({
    title: '',
    description: '',
    deadline: '',
    assignee_id: null
});
const smartMatchReason = ref('');
const reassigning = ref(false);
const reassigningTaskId = ref(null);

const fetchGroupTasks = async () => {
    try {
        const response = await api.get(`tasks/group/${group_id}`);
        console.log('小组任务列表:', response);
        tasks.value = response;
    } catch (error) {
        console.error('获取小组任务失败：', error.message);
        alert('加载小组任务失败，请稍后再试');
    }
};

const createTask = async () => {
    try {
        const response = await api.post(`tasks/${group_id}`, taskEditting.value);
        alert(response.message || '任务创建成功');
        showCreateTaskModal.value = false;
        taskEditting.value = {
            title: '',
            description: '',
            deadline: '',
            assignee_id: null
        };
        fetchGroupTasks();
    } catch (error) {
        console.error('创建任务失败：', error.message);
        alert(error.response?.data?.message || '创建任务失败，请稍后再试');
    }
};

const smartMatch = async (event) => {
    event.preventDefault();
    try {
        const response = await api.post(`tasks/auto_assign/${group_id}`, {
            title: taskEditting.value.title,
            description: taskEditting.value.description
        });
        console.log('智能匹配结果:', response);
        smartMatchReason.value = response.reason;
        taskEditting.value.assignee_id = response.user_id;
    } catch (error) {
        console.error('智能匹配失败：', error.message);
        alert(error.response?.data?.message || '智能匹配失败，请稍后再试');
    }
};

const showReassignModal = (event, task) => {
    console.log("正在分配：", task);

    event.stopPropagation();
    taskEditting.value = {
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        assignee_id: task.user_id
    };
    showCreateTaskModal.value = true;
    reassigningTaskId.value = task.task_id;
    reassigning.value = true;
};

const reassignTask = async () => {
    try {
        const response = await api.post(
            `tasks/reassign/${reassigningTaskId.value}/${taskEditting.value.assignee_id}`
        );
        alert(response.message);
        showCreateTaskModal.value = false;
        taskEditting.value = {
            title: '',
            description: '',
            deadline: '',
            assignee_id: null
        };
        await fetchGroupTasks();
    } catch (error) {
        console.error('重新分配任务失败：', error.message);
        alert(error.response?.data?.message || '重新分配任务失败，请稍后再试');
    }
};

const goToTaskDetails = (taskId) => {
    router.push(`/task/${taskId}`);
};

// 页面加载时获取小组详情
onMounted(() => {
    fetchGroupDetails();
    fetchGroupTasks();
});
</script>

<style scoped>
/* 页面样式 */
.transfer-leader-button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #ff9800;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.transfer-leader-button:hover {
    background-color: #e68a00;
}

.group-details {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
}

.form-group {
    margin-bottom: 15px;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}

h2 {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 15px;
    color: #333;
}

p {
    margin: 5px 0;
    color: #555;
}

/* 组长操作按钮样式 */
.leader-actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

.edit-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.edit-button:hover {
    background-color: #0056b3;
}

.disband-button {
    padding: 10px 20px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.disband-button:hover {
    background-color: #c82333;
}

/* 成员列表样式 */
.member-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 20px;
}

.member-item {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #007bff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.member-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.member-item.leader {
    background-color: #ffc107;
    /* 组长背景色 */
}

.kick-button {
    position: absolute;
    bottom: -10px;
    right: -10px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 5px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.kick-button:hover {
    background-color: #d9363e;
}

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

.form-actions {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.submit-button {
    margin-right: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    font-size: 14px;
}

.cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #f44336;
    color: white;
    cursor: pointer;
    font-size: 14px;
}

.submit-button:hover {
    background-color: #0056b3;
}

.cancel-button:hover {
    background-color: #999;
}

.join-group-section {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.join-group-section h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
}

textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    font-size: 14px;
}

.submit-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #0056b3;
}

.task-list {
    margin-top: 20px;
}

.tasks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.task-card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    cursor: pointer;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
}

.task-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.task-desc {
    font-size: 18px;
    color: #333;
    font-weight: bold;
}

.smart-match-button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
}
</style>
