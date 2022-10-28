// 注册新用户的处理函数
const db = require('../db/index')
const bcrypt = require('bcryptjs')


module.exports.login = (req, res) => {
    res.send('login ok')
}

module.exports.regUser = (req, res) => {
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body;
    //对表单中的数据进行合法性的校验e
    if (!userinfo.username || !userinfo.password) {
        return res.send({
            status: 1,
            message: '用户名或密码不合法'
        });
    }

    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
          /*  return res.send({
                status: 1,
                message: err.message
            })  */
            return res.cc(err)
        }
        //判断用户名是否被占用
        if (results.length > 0) {
         /*   return res.send({
                status: 1,
                message: '用户名被占用，请更换其他用户名'
            }) */
            return res.cc('用户名被占用，请更换其他用户名')
        }
    })
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);

    //插入新用户
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
        if (err) {
          /*   return res.send({
                status: 1,
                message: err.message
            }) */
            return res.cc(err)
        }

        //判断影响的行数是否为1 
        if (results.affectedRows !== 1) {
          /*   return res.send({
                status: 1,
                message: '注册用户失败'
            }) */
            return res.cc('注册用户失败')
        }

       /* res.send({
            status: 0,
            message: '注册成功'
        }) */
        res.cc('注册成功',0);
    })
    // res.send('reguser ok'); 不能同时执行两次res.send
}