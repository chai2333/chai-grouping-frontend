/// <reference types="cypress" />

describe('CG_Sys_Testcase_Flow_001 - 小组成型流程', () => {
  let leader, leaderPwd, groupName, groupDesc;

  before(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.fixture('test_users').then((users) => {
      leader = users.Leader1.username;
      leaderPwd = users.Leader1.password;
    });
    cy.fixture('test_group').then((group) => {
      groupName = group.name + '_flow';
      groupDesc = group.description + '_flow';
    });
  });

  it('Leader登录-创建组-三人申请-同意-组员增加', () => {
    // 1. 登录
    cy.visit('/login');
    cy.get('input#username').clear().type(leader);
    cy.get('input#password').clear().type(leaderPwd);
    cy.get('button[type="submit"]').contains('登录').click();
    cy.url().should('include', '/home');

    // 2. 进入“我的组-我创建的组”
    cy.contains('我的组').click();
    cy.contains('我创建的组').click();
    cy.url().should('include', '/my-group/created');

    // 3. 创建小组
    cy.contains('创建组').click();
    cy.get('.modal').should('be.visible');
    cy.get('input#name').clear().type(groupName);
    cy.get('textarea#description').clear().type(groupDesc);
    cy.get('input#volume').clear().type('10');
    cy.get('select#visibility').select('公开');
    cy.get('select#approval_required').select('需要申请');
    cy.get('button[type="submit"]').contains('提交').click();
    cy.contains(groupName).should('exist');

    // 4. 在列表中找到刚创建的小组并点击，进入详情页
    cy.contains(groupName).parents('.group-item,.group-card').first().click();
    cy.url().should('match', /\/group\/\d+$/);

    // 5. 获取当前url中的group_id
    cy.url().then((url) => {
      const match = url.match(/\/group\/(\d+)$/);
      expect(match).to.not.be.null;
      const groupId = match[1];

      // 6. 后端插入三条申请和三条通知
      cy.task('insertNotificationsJoinRequests', { group_id: Number(groupId) });

      cy.go('back');

      // 7. 跳转到通知页面
      cy.contains('首页').click();
      cy.contains('最近通知').click();
      cy.url().should('include', '/notifications');

      // 8. 依次同意三个申请
      cy.get('.notification-item')
        .filter(':contains("Approval")')
        .each(($el) => {
          cy.wrap($el).click();
          cy.get('.modal').should('be.visible');
          cy.get('.modal').contains('同意').click();
          cy.get('.modal').should('not.exist');
        });

      cy.contains('返回主页').click();

      // 9. 回到小组详情页面
      cy.contains('我的组').click();
      cy.contains('我创建的组').click();
      cy.contains(groupName).parents('.group-item,.group-card').first().click();
      cy.url().should('match', /\/group\/\d+$/);

      // 10. 检查成员数量为4（自己+3个新成员）
      cy.get('.member-list .member-item').should('have.length', 4);
    });
  });
});


/// <reference types="cypress" />

describe('CG_Sys_Testcase_Flow_002 - 任务与提交', () => {
  let leader, leaderPwd, groupName, groupId, taskTitle1, taskTitle2, taskDesc1, taskDesc2;

  before(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');
    cy.fixture('test_users').then(users => {
      leader = users.Leader1.username;
      leaderPwd = users.Leader1.password;
    });
    cy.fixture('test_group').then(group => {
      groupName = group.name;
    });
    cy.fixture('test_tasks').then(tasks => {
      taskTitle1 = tasks.task1.title;
      taskDesc1 = tasks.task1.description;
      taskTitle2 = tasks.task2.title;
      taskDesc2 = tasks.task2.description;
    });
  });

  it('组长创建两个任务并在其中一个任务下创建两个提交', () => {
    // 1. 登录
    cy.visit('/login');
    cy.get('input#username').clear().type(leader);
    cy.get('input#password').clear().type(leaderPwd);
    cy.get('button[type="submit"]').contains('登录').click();
    cy.url().should('include', '/home');

    // 2. 进入“我的组-我创建的组”
    cy.contains('我的组').click();
    cy.contains('我创建的组').click();
    cy.url().should('include', '/my-group/created');

    // 3. 进入第一个小组详情
    cy.get('.group-item').first().click();
    cy.url().should('match', /\/group\/\d+$/);

    // 4. 获取当前group_id
    cy.url().then(url => {
      const match = url.match(/\/group\/(\d+)$/);
      expect(match).to.not.be.null;
      groupId = match[1];

      // 5. 创建第一个任务
      cy.contains('创建任务').click();
      cy.get('.modal').should('be.visible');
      cy.get('input#task-title').clear().type(taskTitle1);
      cy.get('textarea#task-description').clear().type(taskDesc1);
      cy.get('input#task-deadline').type('2099-12-31');
      cy.get('select#task-assignee').select(leader);
      cy.get('button.submit-button').contains('创建').click();
      cy.contains(taskTitle1).should('exist');

      // 6. 创建第二个任务
      cy.contains('创建任务').click();
      cy.get('.modal').should('be.visible');
      cy.get('input#task-title').clear().type(taskTitle2);
      cy.get('textarea#task-description').clear().type(taskDesc2);
      cy.get('input#task-deadline').type('2099-12-31');
      cy.get('select#task-assignee').select(leader);
      cy.get('button.submit-button').contains('创建').click();
      cy.contains(taskTitle2).should('exist');

      // 7. 进入第一个任务详情
      cy.contains(taskTitle1).parents('.task-card').click();
      cy.url().should('include', '/task/');

      // 8. 创建第一个提交
      cy.contains('创建新提交').click();
      cy.get('.modal').should('be.visible');
      cy.get('textarea').clear().type('第一次提交内容');
      cy.get('button.submit-button').contains('提交').click();
      cy.contains('第一次提交内容').should('exist');

      // 9. 创建第二个提交
      cy.contains('创建新提交').click();
      cy.get('.modal').should('be.visible');
      cy.get('textarea').clear().type('第二次提交内容');
      cy.get('button.submit-button').contains('提交').click();
      cy.contains('第二次提交内容').should('exist');

      // 10. 页面应有两个提交内容
      cy.contains('第一次提交内容').should('exist');
      cy.contains('第二次提交内容').should('exist');
    });
  });
});
