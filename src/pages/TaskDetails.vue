<template>
  <div class="task-header">
    <h1>{{ task.title }}</h1>
    <p><strong>小组：</strong> {{ task.group_name }}</p>
    <p><strong>负责人：</strong> {{ task.username }}</p>
    <p><strong>描述：</strong> {{ task.description }}</p>
    <p><strong>状态：</strong> {{ task.state }}</p>
    <p><strong>截止日期：</strong> {{ new Date(task.deadline).toLocaleString() }}</p>
  </div>
  <button v-if="performable" class="create-submission-button" @click="showSubmissionModal = true">
    创建新提交
  </button>
  <div v-if="task.submissions.length" class="submissions-container">
    <h2>提交</h2>
    <ul class="submissions-list">
      <li
        v-for="submission in task.submissions"
        :key="submission.submission_id"
        class="submission-item"
      >
        <p><strong>用户名：</strong> {{ submission.username }}</p>
        <p>
          <strong>创建日期：</strong> {{ new Date(submission.creation_date).toLocaleString() }}
        </p>
        <p><strong>文本：</strong> {{ submission.text }}</p>
        <p v-if="submission.file_name">
          <strong>文件：</strong> {{ submission.file_name }}
          <button @click="downloadFile(submission.submission_id)">下载</button>
        </p>
        <button v-if="performable" @click="editSubmission(submission)">编辑</button>
        <button v-if="performable" @click="deleteSubmission(submission.submission_id)">
          删除
        </button>
      </li>
    </ul>
  </div>

  <div v-if="showSubmissionModal" class="modal-overlay">
    <div class="modal">
      <h2 v-if="!isEditingSubmission">创建新提交</h2>
      <h2 v-if="isEditingSubmission">编辑提交</h2>
      <textarea v-model="newSubmissionText" placeholder="输入你的提交文本"></textarea>
      <input type="file" @change="handleFileUpload" />
      <div class="form-actions">
        <button class="submit-button" v-if="!isEditingSubmission" @click="submitNewSubmission">
          提交
        </button>
        <button class="update-button" v-if="isEditingSubmission" @click="updateSubmission">
          更新
        </button>
        <button class="cancel-button" @click="showSubmissionModal = false">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { api } from '@/services/api';
import { useRoute } from 'vue-router';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const currentUserId = JSON.parse(localStorage.getItem('user_id'));

const performable = computed(() => {
  return task.value.user_id === currentUserId && task.value.state === 'ongoing';
});

const route = useRoute();

const task = ref({
  task_id: null,
  group_id: null,
  group_name: '',
  user_id: null,
  username: '',
  title: '',
  description: '',
  state: '',
  deadline: '',
  submissions: []
});

const showSubmissionModal = ref(false);
const newSubmissionText = ref('');
const newSubmissionFile = ref(null);
const isEditingSubmission = ref(false);
const editingSubmissionId = ref(null);

const handleFileUpload = (event) => {
  newSubmissionFile.value = event.target.files[0];
};

const submitNewSubmission = async () => {
  try {
    const formData = new FormData();
    formData.append('text', newSubmissionText.value);
    if (newSubmissionFile.value) {
      formData.append('file', newSubmissionFile.value);
    }

    console.log('formData:', formData);

    const response = await fetch(`${apiUrl}/submissions/submit/${route.params.task_id}`, {
      method: 'POST',
      headers: {
        ContentType: 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    const data = await response.json();
    alert(data.message);

    await getTaskDetails();
    showSubmissionModal.value = false;
  } catch (error) {
    console.error('Failed to create new submission', error);
    alert('Failed to create new submission, please try again later');
  }
};

const updateSubmission = async () => {
  try {
    const formData = new FormData();
    formData.append('text', newSubmissionText.value);
    if (newSubmissionFile.value) {
      formData.append('file', newSubmissionFile.value);
    }

    console.log('formData:', formData);

    const response = await fetch(`${apiUrl}/submissions/${editingSubmissionId.value}/update`, {
      method: 'POST',
      headers: {
        ContentType: 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    const data = await response.json();
    alert(data.message);

    await getTaskDetails();
    showSubmissionModal.value = false;
  } catch (error) {
    console.error('Failed to update submission', error);
    alert('Failed to update submission, please try again later');
  }
};

const getTaskDetails = async () => {
  try {
    const response = await api.get(`tasks/${route.params.task_id}`);
    task.value = response;
    console.log('得到了任务详情:', task.value);
  } catch (error) {
    console.error('获取任务详情失败', error);
  }
};

const downloadFile = async (submission_id) => {
  try {
    const response = await fetch(`${apiUrl}/submissions/${submission_id}/download`, {
      method: 'GET',
      headers: {
        responseType: 'blob',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = task.value.submissions.find(
      (submission) => submission.submission_id === submission_id
    ).file_name;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download file', error);
    alert('Failed to download file, please try again later');
  }
};

const editSubmission = (submission) => {
  newSubmissionText.value = submission.text;
  isEditingSubmission.value = true;
  editingSubmissionId.value = submission.submission_id;
  showSubmissionModal.value = true;
};

const deleteSubmission = async (submission_id) => {
  try {
    const response = await api.delete(`submissions/${submission_id}/delete`);
    alert(response.message);
    await getTaskDetails();
  } catch (error) {
    console.error('Failed to delete submission', error);
    alert('Failed to delete submission, please try again later');
  }
};

onMounted(() => {
  getTaskDetails();
});
</script>

<style scoped>
.task-header {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.submissions-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.submissions-list {
  list-style-type: none;
  padding: 0;
}

.submission-item {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.create-submission-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
}

.create-submission-button:hover {
  background-color: #0056b3;
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

.submit-button,
.update-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
}

.submit-button:hover {
  background-color: #45a049;
}

.update-button {
  background-color: #007bff;
  color: white;
}

.update-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #d32f2f;
}
</style>
