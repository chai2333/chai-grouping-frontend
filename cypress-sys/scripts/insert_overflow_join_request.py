import mysql.connector
from datetime import datetime

def insert_overflow_join_request():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="chai_grouping"
    )
    cur = conn.cursor()

    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # 插入 join_request
    cur.execute(
        "INSERT INTO join_request (user_id, group_id, creation_time, description, state) VALUES (%s, %s, %s, %s, %s)",
        (5, 1, now, "Member4Request Member4Request", "PENDING")
    )
    join_request_id = cur.lastrowid

    # 查询Leader1的user_id
    cur.execute("SELECT leader_id FROM `group` WHERE group_id = %s", (1,))
    leader_id = cur.fetchone()[0]

    # 插入 notification
    cur.execute(
        "INSERT INTO notification (user_id, title, content, join_request_id, has_read, creation_time) VALUES (%s, %s, %s, %s, %s, %s)",
        (
            leader_id,
            "OverflowJoinRequest",
            "Member4Request Member4Request",
            join_request_id,
            0,
            now
        )
    )

    # 模拟 Member2、Member3 已经加入 group1
    cur.execute(
        "INSERT IGNORE INTO membership (group_id, user_id, join_date) VALUES (%s, %s, %s)",
        (1, 3, now)
    )
    cur.execute(
        "INSERT IGNORE INTO membership (group_id, user_id, join_date) VALUES (%s, %s, %s)",
        (1, 4, now)
    )

    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    insert_overflow_join_request()
