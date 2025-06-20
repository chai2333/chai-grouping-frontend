import mysql.connector
import json
import os

def insert_test_task():
    # 读取fixture数据
    fixture_path = 'fixtures/test_tasks.json'
    with open(fixture_path, 'r', encoding='utf-8') as f:
        tasks = json.load(f)

    task = tasks.get("task1", {})

    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="chai_grouping"
    )
    cur = conn.cursor()

    # 插入任务
    cur.execute(
        "INSERT INTO task (group_id, user_id, title, description, state, deadline) VALUES (%s, %s, %s, %s, %s, %s)",
        (
            1,  # group_id
            1,  # user_id
            task.get("title", "Default Title"),
            task.get("description", "Default Description"),
            "ongoing",  # state
            "2099-12-31"  # deadline
        )
    )

    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    insert_test_task()