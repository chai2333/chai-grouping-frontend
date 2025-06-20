import mysql.connector
import json
import os
from datetime import datetime

def insert_notifications_join_requests():
    # 读取 join_requests fixture
    join_req_path = os.path.join(os.path.dirname(__file__), '../fixtures/test_join_requests.json')
    with open(join_req_path, 'r', encoding='utf-8') as f:
        join_requests = json.load(f)

    # 读取 notifications fixture
    notif_path = os.path.join(os.path.dirname(__file__), '../fixtures/test_notifications.json')
    with open(notif_path, 'r', encoding='utf-8') as f:
        notifications = json.load(f)

    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="chai_grouping"
    )
    cur = conn.cursor()

    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # 插入 join_request
    for jr in join_requests.values():
        cur.execute(
            "INSERT INTO join_request (join_request_id, user_id, group_id, creation_time, description, state) VALUES (%s, %s, %s, %s, %s, %s)",
            (
                jr["join_request_id"],
                jr["user_id"],
                jr["group_id"],
                now,
                jr["description"],
                jr["state"]
            )
        )

    # 插入 notification
    for notif in notifications.values():
        cur.execute(
            "INSERT INTO notification (notification_id, user_id, title, content, join_request_id, has_read, creation_time) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (
                notif["notification_id"],
                notif["user_id"],
                notif["title"],
                notif["content"],
                notif["join_request_id"],
                notif["has_read"],
                now
            )
        )

    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    insert_notifications_join_requests()
