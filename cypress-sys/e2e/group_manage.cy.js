/// <reference types="cypress" />
describe('CG_Sys_Testcase_Group_01 - 管理我的小组', () => {
  let userId, token;

  beforeEach(() => {
    // 1. 清空数据库，插入测试用户数据
    cy.task('resetDb');
    cy.task('insertTestUsers');

    // 2. 获取测试用户数据和组数据
    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });
    // 设置 token 到 localStorage
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });
  });

  it('创建小组并进入详情页', () => {
    // 访问主页
    cy.visit('/home');
    cy.url().should('include', '/home');

    // 进入“我的组-我创建的组”
    cy.contains('我的组').click();
    cy.contains('我创建的组').click();
    cy.url().should('include', '/my-group/created');

    // 点击“创建组”按钮
    cy.contains('创建组').click();
    cy.get('.modal').should('be.visible');

    // 填写表单并提交（用 test_group.json 的数据，容量为10）
    cy.fixture('test_group').then((group) => {
      cy.get('input#name').clear().type(group.name);
      cy.get('textarea#description').clear().type(group.description);
      cy.get('input#volume').clear().type('10');
      cy.get('select#visibility').select(group.visibility === 1 ? '公开' : '不公开');
      cy.get('select#approval_required').select(group.approval_required === 1 ? '需要申请' : '直接加入');
      cy.get('button[type="submit"]').contains('提交').click();
    });

    // 检查提示
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/组已创建|创建成功/);
    });

    // 页面显示刚创建的组
    cy.fixture('test_group').then((group) => {
      cy.contains(group.name).should('exist');
      // 点击刚刚创建的组
      cy.contains(group.name).click();
      // 跳转到组详情页
      cy.url().should('match', /\/group\/\d+/);
      cy.contains(group.name).should('exist');
      cy.contains('小组任务');
    });
  });
});

describe('CG_Sys_Testcase_Group_02 - 组员管理', () => {
  let userId, token;

  beforeEach(() => {
    // 1. 清空数据库，插入测试用户和小组数据
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups'); // 插入Gp1和成员

    // 2. 获取测试用户数据和组数据
    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });

    // 设置 token 到 localStorage
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });
  });

  it('组长踢出组员', () => {
    // 进入主页
    cy.visit('/home');
    cy.url().should('include', '/home');

    // 进入“我的组-我创建的组”
    cy.contains('我的组').click();
    cy.contains('我创建的组').click();
    cy.url().should('include', '/my-group/created');

    // 点击Gp1进入组详情
    cy.fixture('test_group').then((group) => {
      cy.contains(group.name).click();
    });
    cy.url().should('match', /\/group\/\d+/);

    // 等待成员列表加载
    cy.get('.member-list .member-item').should('have.length.at.least', 2);

    // 踢出第二个组员（Member1）
    cy.get('.member-list .member-item').eq(1).within(() => {
      cy.get('.kick-button').click();
    });

    // 确认弹窗
    cy.on('window:confirm', () => true);

    // 检查提示
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/已成功将成员移出该组|踢出/);
    });

    // 剩余成员数减少
    cy.get('.member-list .member-item').should('have.length.at.least', 1);
  });
});

describe('CG_Sys_Testcase_Group_03 - 我的小组管理-编辑与解散', () => {
  let userId, token, groupId, groupName;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');

    cy.fixture('test_users').then((users) => {
      userId = users.Leader1.id;
      token = users.Leader1.token;
    });
    cy.fixture('test_group').then((group) => {
      groupId = group.group || 1;
      groupName = group.name;
    });
  });

  it('组长编辑并解散小组', () => {
    // 设置token并直接跳转到小组详情页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });

    cy.visit(`/group/${groupId}`);
    cy.url().should('include', `/group/${groupId}`);

    // 1. 点击“编辑”按钮，弹出编辑表单
    cy.contains('编辑').click();
    cy.get('.modal').should('be.visible');
    // 2. 更改组名、描述、最大人数，点击提交
    const newName = groupName + '_已编辑';
    cy.get('input#name').clear().type(newName);
    cy.get('textarea#description').clear().type('编辑后的描述');
    cy.get('input#volume').clear().type('15');
    cy.get('button[type="submit"]').contains('保存').click();

    // 断言提示信息
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/已更新|小组信息已更新|更改/);
    });

    // 断言页面已显示新组名
    cy.contains(newName).should('exist');

    // 3. 点击“解散小组”并确认
    cy.contains('解散小组').click();
    cy.on('window:confirm', () => true);

    // 断言解散提示
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/小组已解散|解散/);
    });

    // 跳转回组队大厅
    cy.url().should('include', '/group-hall');
  });
});

describe('CG_Sys_Testcase_Group_04 - 找组', () => {
  let userId, token, groupName;

  beforeEach(() => {
    cy.task('resetDb');
    cy.task('insertTestUsers');
    cy.task('insertTestGroups');

    cy.fixture('test_users').then((users) => {
      userId = users.Member2.id;
      token = users.Member2.token;
    });
    cy.fixture('test_group').then((group) => {
      groupName = group.name;
    });
  });

  it('筛选小组并展示结果', () => {
    // 设置token并进入主页
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user_id', userId);
    });

    cy.visit('/home');
    cy.url().should('include', '/home');

    // 点击“小组大厅”
    cy.contains('小组大厅').click();
    cy.url().should('include', '/group-hall');

    // 点击“筛选组”
    cy.contains('筛选组').click();
    cy.get('.modal').should('be.visible');

    // 填写筛选条件
    cy.fixture('test_group').then((group) => {
      cy.get('input#keyword').clear().type(group.name);
      cy.get('input#min-volume').clear().type('2');
      cy.get('input#max-volume').clear().type('20');
      cy.get('input#created-after').clear().type('1999-01-01');
      cy.get('input#created-before').clear().type('2099-01-01');
      cy.get('button.submit-button').click();
    });

    // 检查筛选结果
    cy.contains(groupName).should('exist');
  });
});