import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='1234',
    database='chai_grouping',
)

cursor = conn.cursor()

cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")

tables = [
    'notification',
    'submission',
    'task',
    'join_request',
    'membership',
    'group',
    'user'
]

for table in tables:
    cursor.execute(f'DELETE FROM `{table}`;')
    cursor.execute(f'ALTER TABLE `{table}` AUTO_INCREMENT = 1;')

cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")

conn.commit()
cursor.close()
conn.close()

print("系统测试数据库初始化完成")