const fs=require('fs');
const { resolve } = require('path');
const path=require('path');

//匹配<style>标签的正则
// 其中\s 表示空白字符;\S表示非空白字符; *表示匹配任意次
const regStyle=/<style>[\s\S]*<\/style>/;

//匹配<script>标签的正则
const regScript=/<script>[\s\S]*<\/script>/;

fs.readFile(path.join(__dirname,'./index.html'),'utf-8',(err,dataStr)=>{
    //读取HTML文件失败
    if(err){
        return console.log('读取文件失败'+err.message);
    }
    // console.log(dataStr); 打印的话就是整个html文件里面的代码
    //读取HTML文件成功后，调用对应的方法，拆解出 css、js 和 html 文件
    resolveCSS(dataStr);
    resolveJS(dataStr);
    resolveHTML(dataStr);
})

//处理css样式
function resolveCSS(dataStr){
//使用正则提取页面中的<style></style>标签
//exec()方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
const r1= regStyle.exec(dataStr);

// 因为匹配的只有一整个<style>标签，所以是r1[0],将提取出来的样式字符串，去掉<style>标签,
const newCSS=r1[0].replace('<style>','').replace('</style>','');

// 将提取出来的css样式，写入到index.css文件中
fs.writeFile(path.join(__dirname,'./index.css'),newCSS,err=>{
  if(err){
    return console.log('写入css样式失败',err.message);
  }
  console.log('写入css样式成功');
})
}

function  resolveJS(dataStr){
const r2= regScript.exec(dataStr);
const newJS=r2[0].replace('<script>','').replace('</script>','');
fs.writeFile(path.join(__dirname,'./index.js'),newJS,err=>{
  if(err){
    return console.log('写入js样式失败',err.message);
  }
  console.log('写入js样式成功');
})
}

function  resolveHTML(dataStr){
//  先 使用repalce 将整个js与css标签，分别换成外联标签<link>和<script src=...>
const newHTML=dataStr.replace(regScript,'<script src="./index.js"></script>')
.replace(regStyle,'<link rel="stylesheet" href="./index.css"/>');
//将完成替换之后的代码写入
fs.writeFile(path.join(__dirname,'./indexHTML.html'),newHTML,err=>{
    if(err){
        return console.log('写入html样式失败',err.message);
      }
      console.log('写入html样式成功');
})
}