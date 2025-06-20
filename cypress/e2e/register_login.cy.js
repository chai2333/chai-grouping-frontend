/// <reference types="cypress" />
describe('CG_Sys_Testcase_User_01 - 注册与登录', () => {
  let username, password;

  beforeEach(() => {
    cy.task('resetDb');
    cy.fixture('test_users').then((users) => {
      username = users.Leader1.username;
      password = users.Leader1.password;
    });
  });

  it('从访问 / 开始，完成注册并登录', () => {
    // Step 1: 访问 '/'，应跳转到 '/login'
    cy.visit('/');
    cy.url().should('include', '/login');

    // Step 2: 点击“立即注册”跳转注册页
    cy.contains('立即注册').click();
    cy.url().should('include', '/register');

    // Step 3: 填写注册表单
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#confirmPassword').type(password);
    cy.get('button[type="submit"]').click();

    // Step 4: 断言 alert 弹窗
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('注册成功');
    });

    // Step 5: 回到登录页，输入注册信息
    cy.url().should('include', '/login');
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();

    // Step 6: 登录成功后跳转首页
    cy.url().should('include', '/home');
    cy.contains('ChaiTeam'); // 确认跳转成功
  });
});
