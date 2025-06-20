import json
import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='1234',
    database='chai_grouping',
)

FIXTURE_FILE = 'fixtures/test_users.json'

def insert_users():
    cursor = conn.cursor()

    # 读取 JSON 文件
    with open(FIXTURE_FILE, 'r', encoding='utf-8') as f:
        users = json.load(f)

    for user in users.values():
        user_id = user["id"]
        username = user["username"]
        encodedPassword = user["encodedPassword"]

        # 插入用户数据
        sql = """
            INSERT INTO user (user_id, username, password)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE username = VALUES(username), password = VALUES(password)
        """
        cursor.execute(sql, (user_id, username, encodedPassword))

    conn.commit()
    cursor.close()
    conn.close()


if __name__ == '__main__':
    insert_users()
