/// <reference types="cypress" />
describe('CG_Sys_Testcase_Notification_01 - 通知管理', () => {
  let userId, token;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');
    cy.task('insertNotificationsJoinRequests');

    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });
  });

  it('全部未读通知标记为已读后列表清空', () => {
    // 登录并进入主页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });
    cy.visit('/home');
    cy.url().should('include', '/home');

    // 点击“最近通知”进入通知列表
    cy.contains('最近通知').click();
    cy.url().should('include', '/notifications');

    // 筛选未读
    cy.get('select.notification-filter').select('未读');
    cy.get('.notification-item.unread').should('have.length.at.least', 1);

    // 点击“标记全部为已读”
    cy.contains('标记全部为已读').click();

    // 判断通知容器是否为空
    cy.get('.notification-list').find('.notification-item.unread').should('have.length', 0);
    cy.get('.notification-list').children('.notification-item').should('have.length', 0);
  });
});

describe('CG_Sys_Testcase_Notification_02 - 通知详情-查看一般通知', () => {
  let userId, token, normalTitle, normalContent;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');
    cy.task('insertNotificationsJoinRequests');

    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });
    cy.fixture('test_notifications').then((notifs) => {
      normalTitle = notifs.notification1.title;
      normalContent = notifs.notification1.content;
    });
  });

  it('点击普通通知后展示详细内容并关闭后消失', () => {
    // 登录并进入主页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });
    cy.visit('/home');
    cy.url().should('include', '/home');

    // 进入通知列表
    cy.contains('最近通知').click();
    cy.url().should('include', '/notifications');

    // 点击普通通知
    cy.contains(normalTitle).click();

    // 检查弹窗内容
    cy.get('.modal').should('be.visible');
    cy.get('.modal').within(() => {
      cy.contains(normalTitle).should('exist');
      cy.contains(normalContent).should('exist');
      cy.contains('关闭').click();
    });
  });
});

describe('CG_Sys_Testcase_Notification_03 - 通知详情-同意申请', () => {
  let userId, token, approvalTitle, approvalContent;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');
    cy.task('insertNotificationsJoinRequests');

    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });
    cy.fixture('test_notifications').then((notifs) => {
      approvalTitle = notifs.notification2.title;
      approvalContent = notifs.notification2.content;
    });
  });

  it('点击申请通知后同意申请并消失', () => {
    // 登录并进入主页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });
    cy.visit('/home');
    cy.url().should('include', '/home');

    // 进入通知列表
    cy.contains('最近通知').click();
    cy.url().should('include', '/notifications');

    // 点击申请通知
    cy.contains(approvalTitle).click();

    // 检查弹窗内容
    cy.get('.modal').should('be.visible');
    cy.get('.modal').within(() => {
      cy.contains(approvalTitle).should('exist');
      cy.contains(approvalContent).should('exist');
      cy.contains('同意').click();
    });

    // 关闭后该通知应消失（已读后不在未读列表）
    cy.get('.notification-list').children('.notification-item').each(($el) => {
      cy.wrap($el).should('not.contain.text', approvalTitle);
    });
  });
});

describe('CG_Sys_Testcase_Notification_04 - 通知详情-拒绝申请', () => {
  let userId, token, approvalTitle, approvalContent;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');
    cy.task('insertNotificationsJoinRequests');

    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });
    cy.fixture('test_notifications').then((notifs) => {
      approvalTitle = notifs.notification2.title;
      approvalContent = notifs.notification2.content;
    });
  });

  it('点击申请通知后拒绝申请并消失', () => {
    // 登录并进入主页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });
    cy.visit('/home');
    cy.url().should('include', '/home');

    // 进入通知列表
    cy.contains('最近通知').click();
    cy.url().should('include', '/notifications');

    // 点击申请通知
    cy.contains(approvalTitle).click();

    // 检查弹窗内容并点击拒绝
    cy.get('.modal').should('be.visible');
    cy.get('.modal').within(() => {
      cy.contains(approvalTitle).should('exist');
      cy.contains(approvalContent).should('exist');
      cy.contains('拒绝').click();
    });

    // 关闭后该通知应消失（已读后不在未读列表）
    cy.get('.notification-list').children('.notification-item').each(($el) => {
      cy.wrap($el).should('not.contain.text', approvalTitle);
    });
  });
});