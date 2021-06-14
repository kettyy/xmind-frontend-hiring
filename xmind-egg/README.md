## 前期准备

```
数据库：mysql v8.0.25
数据库地址：127.0.0.1:3306
数据库账号：root
数据库密码：sql2021!~
数据库名：xmind

由于Node.js mysql模块不支持MySQL8的认证协议，请使用以下方式更新密码
$ alter user 'root'@'localhost' identified with mysql_native_password by 'sql2021!~';
```

## 快速开始

```bash
$ yarn
$ yarn db
$ yarn dev
```

## 测试

```bash
$ yarn test
```
