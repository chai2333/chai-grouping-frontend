/// <reference types="cypress" />

describe('CG_Sys_Testcase_Task_01 - 任务发布与分配', () => {
  let userId, token, groupId, leaderName, memberName, taskTitle, taskDesc;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');

    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
      leaderName = users.Leader1.username;
      memberName = users.Member1.username;
    });

    cy.fixture('test_group').then((group) => {
      groupId = group.group || 1;
    });

    cy.fixture('test_tasks').then((tasks) => {
      taskTitle = tasks.task1.title;
      taskDesc = tasks.task1.description;
    });
  });

  it('组长创建任务并重新分配负责人', () => {
    // 以组长身份登录并跳转到小组详情页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });
    cy.visit(`/group/${groupId}`);
    cy.url().should('include', `/group/${groupId}`);

    // 1. 点击“创建任务”
    cy.contains('创建任务').click();
    cy.get('.modal').should('be.visible');

    // 2. 填写任务表单，负责人为自己
    cy.get('input#task-title').clear().type(taskTitle);
    cy.get('textarea#task-description').clear().type(taskDesc);
    cy.get('input#task-deadline').type('2099-12-31');
    cy.get('select#task-assignee').select(leaderName);
    cy.get('button.submit-button').contains('创建').click();

    // 断言任务创建成功
    cy.contains(taskTitle).should('exist');
    cy.contains(leaderName).should('exist');

    // 3. 点击“重新分配”
    cy.contains(taskTitle)
      .parents('.task-card')
      .within(() => {
        cy.contains('重新分配').click();
      });
    cy.get('.modal').should('be.visible');

    // 4. 选择另一个负责人（Member1），点击重新分配
    cy.get('select#task-assignee').select(memberName);
    cy.get('button.submit-button').contains('重新分配').click();

    // 断言负责人改变
    cy.contains(taskTitle)
      .parents('.task-card')
      .within(() => {
        cy.contains(memberName).should('exist');
      });
  });
});

describe('CG_Sys_Testcase_Task_02 - 个人任务管理-查看与提交管理', () => {
  let userId, token, taskId, taskTitle;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');
    cy.task('insertTestTasks'); // 插入任务

    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });

    cy.fixture('test_tasks').then((tasks) => {
      taskId = tasks.task1.id;
      taskTitle = tasks.task1.title;
    });
  });

  it('负责人提交并修改提交', () => {
    // 以负责人身份登录并进入主页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });
    cy.visit('/home');
    cy.url().should('include', '/home');

    // 进入“我的任务”
    cy.contains('我的任务').click();
    cy.url().should('include', '/my-tasks');

    // 点击任务卡片进入详情
    cy.contains(taskTitle).click();
    cy.url().should('include', `/task/${taskId}`);

    // 1. 创建新提交
    cy.contains('创建新提交').click();
    cy.get('.modal').should('be.visible');
    cy.get('textarea').clear().type('第一次提交内容');
    cy.get('input[type="file"]').selectFile('cypress-sys/fixtures/Normal_file.txt');
    cy.get('button.submit-button').contains('提交').click();

    // 断言提交成功
    cy.contains('第一次提交内容').should('exist');
    cy.contains('Normal_file.txt').should('exist');

    // 2. 编辑提交
    cy.contains('编辑').first().click();
    cy.get('.modal').should('be.visible');
    cy.get('textarea').clear().type('第二次提交内容');
    cy.get('input[type="file"]').selectFile('cypress-sys/fixtures/Normal_file2.txt');
    cy.get('button.update-button').contains('更新').click();

    // 断言提交更新成功
    cy.contains('第二次提交内容').should('exist');
    cy.contains('Normal_file2.txt').should('exist');
  });
});

describe('CG_Sys_Testcase_Task_03 - 个人任务管理-查看与提交管理-下载别人提交的文件', () => {
  let userId, token, taskId, taskTitle, fileName;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');
    cy.task('insertTestTasks');
    cy.task('insertTestSubmissions'); // 给task1插入有文件的提交

    cy.fixture('test_users').then((users) => {
      userId = users.Member2.id;
      token = users.Member2.token;
    });

    cy.fixture('test_tasks').then((tasks) => {
      taskId = tasks.task1.id;
      taskTitle = tasks.task1.title;
    });

    // 插入的文件名为 Normal_file.txt
    fileName = 'Normal_file.txt';
  });

  it('非负责人下载别人提交的文件', () => {
    // 以Member2身份登录并进入任务详情页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });

    cy.visit(`/task/${taskId}`);
    cy.url().should('include', `/task/${taskId}`);

    // 页面应有提交文件
    cy.contains(fileName).should('exist');

    // 拦截下载请求并验证
    cy.intercept('GET', /\/submissions\/\d+\/download/).as('fileDownload');

    // 点击下载按钮
    cy.contains(fileName)
      .parent()
      .within(() => {
        cy.contains('下载').click();
      });

    // 等待下载请求
    cy.wait('@fileDownload').its('response.statusCode').should('eq', 200);
  });
});

describe('CG_Sys_Testcase_Task_04 - 个人任务管理-查看与提交管理-提交的删除', () => {
  let userId, token, taskId, taskTitle, fileName, submissionText;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');
    cy.task('insertTestTasks');
    cy.task('insertTestSubmissions'); // 插入一个提交

    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });

    cy.fixture('test_tasks').then((tasks) => {
      taskId = tasks.task1.id;
      taskTitle = tasks.task1.title;
    });

    fileName = 'Normal_file.txt';
    submissionText = 'SubmissionTextSubmissionTextSubmissionText';
  });

  it('负责人删除自己的提交', () => {
    // 以Leader1身份登录并进入任务详情页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });

    cy.visit(`/task/${taskId}`);
    cy.url().should('include', `/task/${taskId}`);

    // 页面应有提交内容
    cy.contains(submissionText).should('exist');
    cy.contains(fileName).should('exist');

    // 点击删除按钮
    cy.contains(submissionText)
      .parents('.submission-item')
      .within(() => {
        cy.contains('删除').click();
      });

    // 断言提示
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/deleted successfully/);
    });

    // 提交内容和文件名应消失
    cy.contains(submissionText).should('not.exist');
    cy.contains(fileName).should('not.exist');
  });
});