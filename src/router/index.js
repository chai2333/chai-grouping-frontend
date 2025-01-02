import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layouts/Layout.vue'; // 主布局组件
import Home from '../pages/Home.vue'; // 首页
import GroupHall from '../pages/GroupHall.vue'; // 小组大厅
import CreatedGroups from '../pages/CreatedGroups.vue';
import MyTasks from '../pages/MyTasks.vue'; // 我的任务
import PersonalInfo from '../pages/PersonalInfo.vue'; // 个人信息
import Login from '../pages/Login.vue'; // 登录页面
import Register from '../pages/Register.vue'; // 注册页面
import ApprovedGroups from '../pages/ApprovedGroups.vue';
import PendingApplications from '../pages/PendingApplications.vue';
import NotificationList from '../pages/NotificationList.vue';
import GroupDetails from '../pages/GroupDetails.vue';

const routes = [
  { path: '/', redirect: '/login' }, // 默认重定向到登录页
  { path: '/login', component: Login }, // 登录页面
  { path: '/register', component: Register }, // 注册页面
  {
    path: '/home', // 主布局组件，首页
    component: Layout,
    children: [
      { path: '', component: Home }, // 首页
    ]
  },
  { path: '/notifications', component: NotificationList }, // 通知列表页面
  { path: '/group/:id', component: GroupDetails }, // 小组详情
  {
    path: '/group-hall', // 小组大厅页面
    component: Layout,
    children: [
      { path: '', component: GroupHall },
    ]
  },
  {
    path: '/my-group',
    component: Layout,
    children: [
      { path: '', redirect: '/my-group/created' },
      { path: 'created', component: CreatedGroups },
      {
        path: 'joined',
        redirect: '/my-group/joined/approved',
        children: [
          { path: 'approved', component: ApprovedGroups },
          { path: 'pending', component: PendingApplications },
        ],
      },
    ],
  },

  {
    path: '/my-tasks', // 我的任务页面
    component: Layout,
    children: [
      { path: '', component: MyTasks },
    ]
  },
  {
    path: '/personal-info', // 个人信息页面
    component: Layout,
    children: [
      { path: '', component: PersonalInfo },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
