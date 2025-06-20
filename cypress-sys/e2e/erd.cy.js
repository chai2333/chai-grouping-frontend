/// <reference types="cypress" />
describe('CG_Sys_Testcase_Erd_01 - 超出小组容量的申请同意', () => {
  let userId, token;

  before(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');
    cy.task('insertOverflowJoinRequests');

    cy.fixture('test_users').then(users => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });
  });

  it('组长尝试同意满员小组的申请，提示失败', () => {
    // 直接设置token并跳转到通知列表
    cy.visit('/');
    cy.window().then(win => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });
    cy.visit('/notifications');
    cy.url().should('include', '/notifications');

    // 找到Member5的申请通知
    cy.contains('OverflowJoinRequest').click();

    // 弹窗出现点击“同意”
    cy.get('.modal').should('be.visible');
    cy.get('.modal').contains('同意').click();

    // 断言弹窗提示小组已满，申请处理失败
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/失败/);
    });
  });
});
