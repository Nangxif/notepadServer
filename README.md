# notepadServer

> An api project of notepad

## 项目框架介绍
![项目目录](https://github.com/Nangxif/notepadServer/blob/master/about/mulu.png)

## mongodb文件夹结构

>   mongodb
    ----config
    --------mongodb.conf [数据库开启配置文件]
    ----db [数据库文件]
    ----logs [数据库日志文件夹]
    --------mongodb.log
### mongodb.conf内容

```
dbpath=/home/server/mongodb/db
logpath=/home/server/mongodb/logs/mongodb.log
logappend=true
journal=true
port=27017
fork=true
auth=false
```

## 前端项目地址

[点击此处跳转](https://github.com/Nangxif/notepad)