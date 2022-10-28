const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer();

server.on('request', (req, res) => {
    const url = req.url;
    //注意这里不可以使用 const 来定义fpath，不然不可以修改值  
    let fpath ='';
    if(url==='/'){
        fpath=path.join(__dirname,'/index.html')//默认进入首页
    }else {
        fpath=path.join(__dirname,'/',url)
    }

   // 根据"映射过来的文件路径读取文件
    fs.readFile(fpath,'utf-8',(err,dataStr)=>{
      if(err){
        //读取文件失败后，向客户谜响应固定的"错误消息”
        return res.end('404 not found')
      }
      res.end(dataStr)
    })

})

server.listen(80, () => {
    console.log('server listen at http://127.0.0.1');
})