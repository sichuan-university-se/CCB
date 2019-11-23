#!/usr/bin/env python
# -*- coding:utf-8 -*-

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import app
from exts import db

manager = Manager(app)


@manager.command
@manager.option("-t", "--test", dest="test")
def runserver(test=666):
    print("此处为启动服务器命令入口,位于./manage.py 中")
    print(test)


# 使用Migrate对象绑定app与db
migrate = Migrate(app, db)

# 添加迁移脚本的命令道manager中
# 1. init
# 2. migrate
# 3. update
manager.add_command("db", MigrateCommand)


if __name__ == "__main__":
    manager.run()
