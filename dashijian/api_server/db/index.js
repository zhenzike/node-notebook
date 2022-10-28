const mysql=require('mysql2');

//创建数据库连接对象
const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'text'
})

//向外共享db数据库的连接对象
module.exports=db;