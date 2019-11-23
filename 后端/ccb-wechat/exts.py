#!/usr/bin/env python
# -*- coding:utf-8 -*-

# 定义SQLAlchemy对象,避免循环引用

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
