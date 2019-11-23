#!/usr/bin/env python
# -*- coding:utf-8 -*-

# 项目配置文件

import os
from datetime import timedelta

# 开启调试模式,默认为关闭
# Flask 1.0之后, 不再支持通过`DEBUG = True`方式启动Debug
# DEBUG = True
# 使用export语句添加如下变量,即可开启DEBUG模式
# FLASK_ENV = development
# FLASK_DEBUG = 1

# 使用SESSION时,需要随机秘钥
SECRET_KEY = os.urandom(24)
# 设置session的过期时间为7天
PERMANENT_SESSION_LIFETIME = timedelta(days=7)

# 数据库配置,此处为真实远程服务器地址
DIALECT = "mysql"
DRIVER = "mysqldb"
USERNAME = "ccb"
PASSWORD = "123456"
HOST = "mysql.bilibilive.com"
PORT = "3306"
DATABASE = "flask"

# 测试条件下,使用本地数据库
if os.environ.get("FLASK_OFFLINE") == '1':
    USERNAME = "root"
    PASSWORD = "tylzh1997"
    HOST = "local"
    DATABASE = "flask"

SQLALCHEMY_DATABASE_URI = "{}+{}://{}:{}@{}:{}/{}?charser=utf8".format(
    DIALECT, DRIVER, USERNAME, PASSWORD, HOST, PORT, DATABASE
)
# 是否追踪数据修改,默认为True;设置成False能够节省运行内存
SQLALCHEMY_TRACK_MODIFICATIONS = False
