import mysql.connector
import json
import os

def insert_test_group():
    # 读取fixture数据
    fixture_path = 'fixtures/test_group.json'
    with open(fixture_path, 'r', encoding='utf-8') as f:
        group = json.load(f)

    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="chai_grouping"
    )
    cur = conn.cursor()

    # 插入小组
    cur.execute(
        "INSERT INTO `group` (group_id, name, description, creation_date, volume, visibility, approval_required, disbanded, leader_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (
            group.get("group", 1),
            group.get("name", "Gp1"),
            group.get("description", ""),
            group.get("creation_date", "2000-01-01"),
            4,
            group.get("visibility", 1),
            group.get("approval_required", 1),
            0,
            group.get("leader_id", 1)
        )
    )

    # 插入组员（Leader1，组长）
    cur.execute(
        "INSERT INTO membership (group_id, user_id, join_date) VALUES (%s, %s, %s)",
        (group.get("group", 1), group.get("leader_id", 1), group.get("creation_date", "2000-01-01"))
    )
    # 插入组员（Member1，普通成员，id=2）
    cur.execute(
        "INSERT INTO membership (group_id, user_id, join_date) VALUES (%s, %s, %s)",
        (group.get("group", 1), 2, group.get("creation_date", "2000-01-01"))
    )

    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    insert_test_group()
