/// <reference types="cypress" />
describe('CG_Sys_Testcase_User_02 - 简历与个人信息管理', () => {
  let username, token;

  beforeEach(() => {
    cy.task('resetDb');
    cy.fixture('test_users').then((users) => {
      username = users.Leader1.username;
      token = users.Leader1.token;
    });
  });

  it('进入个人信息页，修改账户与简历信息', () => {
    // 直接写入token并访问首页
    cy.fixture('test_users').then((users) => {
      cy.window().then((win) => {
        win.localStorage.setItem('token', users.Leader1.token);
        win.localStorage.setItem('username', users.Leader1.username);
      });
    });
    cy.visit('/home');
    cy.url().should('include', '/home');

    // 进入个人信息页面
    cy.contains('个人信息').click();
    cy.url().should('include', '/profile');

    // 展示账户与简历信息
    cy.get('input#username').should('have.value', username);
    cy.get('textarea#profile');
    cy.get('input#school');
    cy.get('input#grade');
    cy.get('textarea#skill_description');

    // 更改用户名（无重复）与个人简介
    const newUsername = username + '_new';
    const newProfile = '我是' + newUsername + '，这是简介';
    cy.get('input#username').clear().type(newUsername);
    cy.get('textarea#profile').clear().type(newProfile);
    cy.get('button[type="submit"]').contains('更新账户信息').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/账户信息更新成功|更新成功/);
    });

    // 更改学校、年级、技能描述
    cy.get('input#school').clear().type('同济大学');
    cy.get('input#grade').clear().type('大三');
    cy.get('textarea#skill_description').clear().type('我是测试大亡');
    cy.get('button[type="submit"]').contains('更新简历信息').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/简历更新成功|更新成功/);
    });
  });
});
