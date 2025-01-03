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
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/services/api';

const route = useRoute();
const router = useRouter();
const group_id = route.params.group_id;

// 申请加入小组状态
const join_request = ref({
    description: '',
});

// 是否为小组成员
const is_member = computed(() => {
    const user_id = parseInt(localStorage.getItem('user_id')); // 从 localStorage 获取当前用户 ID
    console.log('当前用户 ID:', user_id);

    const member = group_details.value.members.find((member) => member.user_id === user_id);
    console.log('当前用户是否是小组成员:', !!member);
    return !!member; // 如果找到匹配的成员，返回 true；否则返回 false
});




// 控制模态框显示状态
const show_member_modal = ref(false);

// 当前组员的详情数据
const member_details = ref({});

// 提交加入小组申请方法
const applyToGroup = async () => {
    if (!join_request.description.trim()) {
        alert('请输入申请描述！');
        return;
    }

    try {
        const response = await api.post(`groups/${group_id}/apply`, join_request.value);
        alert(response.message || '申请已发送');
        join_request.description = ''; // 清空输入框
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
    members: [],
});

// 是否为组长
const is_leader = computed(() => {
    const current_user_id = parseInt(localStorage.getItem('user_id'));
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
    approval_required: 1,
});

// 打开编辑模态框
const openEditModal = () => {
    edit_form.value = {
        name: group_details.value.name,
        description: group_details.value.description,
        volume: group_details.value.volume,
        visibility: group_details.value.visibility,
        approval_required: group_details.value.approval_required,
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

// 页面加载时获取小组详情
onMounted(() => {
    fetchGroupDetails();
});
</script>

<style scoped>
/* 页面样式 */
.group-details {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
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
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.member-item {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 50%;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    color: #555;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.member-item:hover {
    background-color: #007bff;
    color: white;
}

.member-item.leader {
    background-color: #28a745;
    color: white;
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


input,
textarea,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.submit-button,
.cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.submit-button {
    background-color: #007bff;
    color: white;
}

.cancel-button {
    background-color: #ccc;
    color: black;
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
}

textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
}

.submit-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    background-color: #007bff;
    color: white;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>