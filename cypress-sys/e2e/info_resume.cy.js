/// <reference types="cypress" />

describe('CG_Sys_Testcase_User_02 - 简历与个人信息管理', () => {
  let username, token, userId;

  beforeEach(() => {
    // 1. 清空数据库，插入测试用户数据
    cy.task('resetDb');
    cy.task('insertTestUsers');

    // 2. 获取测试用户数据
    cy.fixture('test_users').then((users) => {
      username = users.Leader1.username;
      token = users.Leader1.token;
      userId = users.Leader1.id;

      // 3. 设置 token 到 localStorage
      cy.visit('/');
      cy.window().then((win) => {
        win.localStorage.setItem('token', token);
        win.localStorage.setItem('user_id', userId);
      });
    });
  });

  it('进入个人信息页，修改账户与简历信息', () => {
    // 访问主页
    cy.visit('/home');
    cy.url().should('include', '/home');

    // 进入个人信息页面
    cy.contains('个人信息').click();
    cy.url().should('include', '/profile');

    // 检查信息存在
    cy.get('input#username').should('have.value', username);
    cy.get('textarea#profile');
    cy.get('input#school');
    cy.get('input#grade');
    cy.get('textarea#skill_description');

    // 更改用户名与简介
    const newUsername = username + '_new';
    const newProfile = '我是' + newUsername + '，这是简介';
    cy.get('input#username').clear().type(newUsername);
    cy.get('textarea#profile').clear().type(newProfile);
    cy.get('button[type="submit"]').contains('更新账户信息').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/账户信息更新成功|更新成功/);
    });

    // 更改简历信息
    cy.get('input#school').clear().type('同济大学');
    cy.get('input#grade').clear().type('大三');
    cy.get('textarea#skill_description').clear().type('我是测试大亡');
    cy.get('button[type="submit"]').contains('更新简历信息').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/简历更新成功|更新成功/);
    });
  });
});
