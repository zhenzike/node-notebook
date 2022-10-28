[TOC]

# 一、Node.js基础

## 1. 概念

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine

Node.js® 是一个基于 Chrome V8 引擎 的 JavaScript 运行时环境

它可以做的事情：

- 基于 [Express 框架 (opens new window)](http://www.expressjs.com.cn/)，可以快速构建 Web 应用
- 基于 [Electron 框架 (opens new window)](https://electronjs.org/)，可以构建跨平台的桌面应用
- 基于 [restify 框架 (opens new window)](http://restify.com/)，可以快速构建 API 接口项目
- 读写和操作数据库、创建实用的命令行工具辅助前端开发、etc…



## 2. 终端

<img src="tu/终端.png">

终端(英文:Terminal)是专门为开发人员设计的。用于**实现人机交互**的一种方式。

识记一些常用的终端命令，可以更好的操作与使用计算机。



**使用终端运行js代码**：

- 打开终端
- 在终端中输入 **cd  文件的绝对路径** 切换至文件目录（或者直接在文件目录按住shift+右击 在此处打开终端）
- 输入node要执行的js文件的全名



**终端的快捷键**：

- 使用⬆键可以快速定位到上一次执行的命令
- 使用tab 键，能够快速补全路径
- 使用esc键，能够快速清空当前已输入的命令
- 输入cls命令，可以清空终端



## 3. fs文件系统模块

fs模块是Node.js官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。

如：

- fs.readFile() 方法，用来读取指定文件中的内容
- fs.writeFile() 方法，用来向指定的文件中写入内容



<span style="color:red">注意</span>：如果要在JavaScript 代码中，使用fs模块来操作文件，则需要使用如下的方式先导入它:

```javascript
const fs=require('fs');
```



### 3.1 读取指定文件中的内容-fs.readFile()

==语法==：

```javascript
fs.readFile(path,[options],callback);
```

参数1:**必选**参数，字符串，表示文件的路径。

参数2: **可选**参数，表示以什么编码格式来读取文件。

参数3∶**必选**参数，文件读取完成后。通过回调函数拿到读取的结果。



例子：

```javascript
const fs=require('fs');
fs.readFile('./1314.txt','utf8',function(err,dataStr){
    //打印失败的结果
    //如果读取成功，则err的值为null
    //如果读取失败，则err 的值为错误对象，dataStr 的值为undefined
    console.log(err);
    console.log('........');

    //打印成功的结果
    console.log(dataStr);
})
```



**判断文件是否读取成功**：

可以==判断err对象是否为null==，从而知晓文件读取的结果

```javascript
const fs=require('fs');
fs.readFile('./1314.txt','utf8',function(err,dataStr){
    if(err){
        return console.log('文件读取失败'+err.message)
    }
     console.log('文件读取成功'+dataStr)
})
```



### 3.2 向指定的文件中写入内容-fs.writeFile()

使用fs.writeFile()方法，可以向指定的文件中写入内容

==语法==：

```javascript
fs.writeFile(path,data,[options],callback);
```

- 参数1:**必选**参数，需要指定一个文件路径的字符串，表示文件的存放路径。
- 参数2:**必选**参数，表示要写入的内容。
- 参数3:**可选**参数，表示以什么格式写入文件内容，默认值是utf8。
- 参数4:**必选**参数，文件写入完成后的回调函数。

==注意==：

- 如果文件写入成功，则err的值等于null
- 如果文件写入失败，则err 的值等于一个错误对象
- 写入的内容会覆盖，文本原来的内容



例子：

```javascript
const fs=require('fs');
fs.writeFile('./1314.txt','abc','utf8',function(err,dataStr){
  if(err){
        return console.log('文件读取失败'+err.message)
    }
     console.log('文件读取成功'+dataStr)
})
```

### 3.3 整理成绩案例

首先 创建一个成绩文本 设置内容为: 小红=99 小白=100 小黄=70 小黑=66 小绿=88

在创建一个 新成绩空文本，并执行一下代码

```javascript
const fs = require('fs');
fs.readFile('./成绩.txt', 'utf8', function (err, dataStr) {
    if (err) {
        return console.log('文件读取失败' + err.message)
    }
    //把成绩的数据，按照空格进行分割,变成数组
    const arrOld = dataStr.split(' ');
    //循环分割数组，对每一项数据，进行字符串的替换操作
    const arrNew = [];
    arrOld.forEach(item => {
        // 替换字符replace('被替换的字符'，'替换为的字符')它只会替换第一个字符,所以需要循环替换
        arrNew.push(item.replace('=', ':'))
    })
    // console.log(arrNew); [ '小红:99', '小白:100', '小黄:70', '小黑:66', '小绿:88' ]



    // 把数组中的每一项，以换行回车符为间隔进行合并，得到一个新的字符串
    const newStr = arrNew.join('\r\n');
    console.log(newStr);
    // 调用fs.writeFile()方法，把处理完毕的成绩，写入到新文件中
    fs.writeFile('./新成绩.txt', newStr, 'utf8', function (err, dataStr) {
        if (err) {
            return console.log('成绩写入失败' + err.message)
        }
        console.log('成绩写入成功');
    })
})
```



### 3.4 fs模块-路径动态拼接问题(_ _dirname)

在使用fs 模块操作文件时，如果提供的操作路径是以./或../开头的**相对路径**时，很容易出现路径动态拼接错误的问题。

**原因** :

代码在运行的时候，会以执行node命令时所处的目录，动态拼接出被操作文件的完整路径。

比如：有一个文件夹A,它有一个子文件夹B,B中存放要读取的文件夹files，files文件夹中存放着1.txt，以及1.js

在1.js中输入以下代码：

```javascript
const fs = require('fs');
fs.readFile('./files/1.txt', 'utf8', function (err, dataStr) {
     if (err) {
        return console.log('读取失败' + err.message)
    }
    console.log('读取成功')
})
```

此时，如果在**B文件夹终端**中，输入 **node  ./1.js** ,可以正常打印出 **读取成功**

但是，如果 输入 **cd ../**  将终端切换到**上一级目录A**,  输入**node  ./B/1.js**   会打印出 读取失败

==原因==：

因为./会直接对路径进行拼接 第一次输入 **node  ./1.js** 时 读取文件的路径为 **C:......\A\B\files/1.txt**

在A目录 输入 **node  ./B/1.js** 时,尽管**运行js的路径是正确的**，但读取文件的路径为**C:......\A\files/1.txt**，而**不是**C:......\A\B\files\1.txt，但是**A文件夹下根本没有files文件**，所以会读取错误。



**解决方式(1)**：

导致拼接错误是因为提供了 ./ 和../ 所以直接提供完整路径 (从盘符开始，用\ \ 分隔) 就可以回避这个问题（**移植性非常差，而且不利于维护**）



**解决方式(2)**：

node提供了一个方法**__dirname**【这里是双下划线】,可以表示当前文件**所处的 目录**，再利用**字符串拼接【后期会换成其他方法】**的方式，就可以定位到所需文件了

```javascript
const fs = require('fs');
fs.readFile(__dirname+'/files/1.txt', 'utf8', function (err, dataStr) {
     if (err) {
        return console.log('读取失败' + err.message)
    }
    console.log('读取成功')
})
```



## 4. path路径模块

path模块是Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。
如：

- path.join()方法，用来**将多个路径片段拼接成一个完整的路径字符串**
- path.basename()方法，用来从路径字符串中，将文件名解析出来

<span style="color:red">注意</span>：如果要在JavaScript 代码中，使用path模块来处理路径，需要先导入它:

```javascript
const path=require('path');
```

### 4.1 路径拼接-path.jion()

使用path.join0方法，可以把多个路径片段拼接为完整的路径字符串:

```javascript
path.join([....paths]);
```

==参数==：

...paths的类型：< string> ：路径片段的序列

返回值的类型：< string>



例子：

```javascript
const fs = require('fs');
const path=require('path');

const pathStr=path.join('/a','/b/c','../','/d')
console.log(pathStr);// 打印\a\b\d ，因为 ../ 会抵消一层路径

const pathStr2=path.join(__dirname,'/d');
console.log(pathStr2);// 打印当前文件所处目录\d
```

注意 : 凡是涉及到路径拼接的操作，都要使用path.join)方法进行处理。不直接使用＋进行字符串的拼接(**如果使用+拼接，如果使用了 ./ 也会被当作字符串拼接进去导致找不到文件**）。



### 4.2 获取路径中的文件名-path.basename()

使用path.basename0方法，可以获取路径中的最后一部分，可以通过这个方法获取路径中的文件名：

```javascript
path.basename(path,[ext])
```

- path < string>必选参数。表示一个路径的字符串
- ext < string>可选参数，表示文件扩展名
- 返回:< string>表示路径中的最后一部分(如果没有加扩展名参数，则是返回完整文件名，若是带了则返回不带扩展名的文件名)



### 4.3 获取路径中的文件扩展名-path.extname()

使用path.extname0方法，可以获取路径中的扩展名部分

```javascript
path.extname(path)
```

- path < string>必选参数，表示一个路径的字符串
- 返回: < string>返回得到的扩展名字符串

## 时钟模块拆分案例

```js
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
```





## 5. HTTP模块

### 5.1 http模块的作用

在网络节点中，负责消费资源的电脑，叫做客户端;负责对外提供网络资源的电脑，叫做服务器。

http模块是Nodejs 官方提供的、用来创建web服务器的模块。

通过 **http模块提供的http.createServer()方**法，就能把一台普通的电脑，变成一台Web服务器，从而对外提供Web资源服务。

使用http模块创建Web 服务器，则需要**先导入它**:

```javascript
const http=require('http');
```



**==建立服务器==**：
在Node.js中，不需要使用lIS、Apache等这些第三方web服务器软件。

可以基于Node.js 提供的http模块，通过几行代码，就能手写一个服务器软件，从而对外提供web 服务。



### 5.2 IP地址

IP地址就是互联网上**每台计算机的唯一地址**，因此IP地址**具有唯一性**。只有在知道对方IP地址的前提下，才能与对应的电脑之间进行数据通信。



**IP地址的格式**：

通常用“点分十进制”表示成(a.b.c.d)的形式，其中a，b，c，d 都是0~255之间的十进制整数。例如:用点分十进表示的IP地址(192.168.1.1)

==注意==：

- 互联网中每台Web服务器，都有自己的IP地址
  - 如:可以在Windows的终端中运行ping www.baidu.com 命令，即可查看到百度服务器的IP地址。

- 在开发期间，自己的电脑既是一台服务器，也是一个客户端，为了方便测试，可以在自己的浏览器中输入<span style="color:red">127.0.0.1</span>这个IP地址，就能把自己的电脑当做一台服务器进行访问【本地地址，其他人无法访问】。



### 5.3 域名和域名服务器

尽管IP地址能够唯一地标记网络上的计算机，但IP地址是一长串数字，不直观，不便于记忆，于是发明了一套**字符型**的地址方案，即**域名(Domain Name)地址**。

**IP地址和域名是——对应的关系**，这份对应关系存放在一种叫做**域名服务器**(DNS，Domain name server)的电脑中。使用者只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器实现。因此，**域名服务器就是提供IР地址和域名之间的转换服务的服务器**。



==注意==：

- 单纯使用IP地址，互联网中的电脑也能够正常工作。
- 在开发测试期间，127.0.0.1对应的域名是localhost。



### 5.4 端口号

计算机中的端口号，就像是现实生活中的门牌号一样。在一台电脑中，可以运行成百上千个web服务。**每个web服务都对应一个唯一的端口号**。客户端发送过来的网络请求，通讨端口号，可以被准确地交给对应的web 服务讲行外理。

<img src="tu/端口号.png">

注意：

- 每个端口号不能同时被多个web服务占用。
- 在实际应用中，URL中的80端口可以被省略。



### 5.5 创建最基本的web服务器

**基本步骤**：

1. 导入http模块
2. 创建web 服务器实例
3. 为服务器实例绑定request事件。
4. 使用**.listen(端口号，callback)**监听客户端的请求启动服务器

例子：

```javascript
const http=require('http');
//创建web服务器实例
const server=http.createServer();

//使用服务器实例的.on()方法。为服务器绑定一个request事件
server.on('request',(req,res)=>{
   // 只要有客户端来请求我们自己的服务器，就会触发request事件。从而调用这个事件处理函数
   console.log('Someone visit our web server');
})

//启动服务器
server.listen(8080,()=>{
    console.log('server running at http://127.0.0.1:8080');
})
```



#### 5.5.1 req请求对象

只要服务器接收到了客户端的请求，就会调用通过server.on()为服务器绑定的request事件处理函数。
如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式:

```javascript
server.on('request', (req) => {
    // req是请求对象，它包含个与客户端相关的数据和属性，例如:
    // req.url是客户端请求的URL地址
    // req.method是客户端的 method请求类型
    const str = 'Your request url is ${req.url}，and request method is ${req.method}'
    console.log(str)
})
```



#### 5.5.2 res 响应对象

在服务器的request事件处理函数中，如果想**访问与服务器相关的数据或属性**，可以使用如下的方式:

```javascript
server.on('request',(req,res)=>{
    // res是响应对象，它包含了与报务器相关的数据和属性，例如:
    //要发送到客户端的字符串
    const str = `Your request url is ${req.url}，and request method is ${req.method}`
    console.log(str);
    res.end(str);
})

//启动服务器
server.listen(80,()=>{
    console.log('server running at http://127.0.0.1:80');
})

打印结果
```

**res.end()**方法的作用:

- 向客户端发送指定的内容，并结束这次请求的处理过程



#### 5.5.3 中文乱码问题-setHeader

当调用res.end)方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式:

```javascript
server.on('request',(req,res)=>{
    const str = `你请求的url地址是 ${req.url},请求的 method 类型是 ${req.method}`
    //为了防止中文显示乱码的问题，需要设置响应头Content-Type 的值为 text/html; charset=utf-8
    res.setHeader('Content-Type' , 'text/html; charset=utf-8');//这是固定写法
    //把包含中文的内容，响应给客户端
    res.end(str);
})
```

#### 5.5.4 根据不同的url响应不同的html内容

步骤：

1. 获取请求的url 地址
2. 设置默认的响应内容为404 Not found
3. 判断用户请求的是否为/或/index.html 首页
4. 判断用户请求的是否为/about.html关于页面
5. 设置Content-Type响应头，防止中文乱码
6. 使用res.end()把内容响应给客户端



##  时钟案例对外提供为web资源

思路：

<img src="tu/对外提供资源.png">

**导入需要的模块和创建基本的web服务器**：

```javascript
const http=require('http');
const fs=require('fs');
const path=require('path');
const server=http.createServer();

server.on('request',(req,res)=>{

})

server.listen(80,()=>{
    console.log('server listen at http://127.0.0.1');
})
```



**将资源的请求url地址映射为文件的存放路径:**

```js
server.on('request', (req, res) => {
    // 获取客户端请求的url地址，注意：获得的路径是不完整的
    const url = req.url;
    //因为读取路径时，需要完整路径，所以把请求的url地址映射为具体文件的存放路径
    const fpath = path.join(__dirname, url); 
})
```



**读取文件的内容并响应给客户端**：

```js
   // 根据"映射过来的文件路径读取文件
    fs.readFile(fpath,'utf-8',(err,dataStr)=>{
      if(err){
        //读取文件失败后，向客户谜响应固定的"错误消息”
        return res.end('404 not found')
      }
      res.end(dataStr)
    })
```

注意：此时若是直接访问网站 是以 /  的路径访问的会显示读取失败，需要再后面再加上对应文件的路径【下面会进行优化】



**优化资源的请求路径**:

方式为：修改掉上面的路径拼接代码(因为正常的拼接需要用户手动输入正确路径)

```js
    //注意这里不可以使用 const 来定义fpath，不然不可以修改值  
    let fpath ='';
    if(url==='/'){
        console.log(__dirname);
        fpath=path.join(__dirname,'/index.html')//默认进入首页
    }else {
        fpath=path.join(__dirname,'/',url)
    }
```



## 6. 模块化

### 6.1 基本概念

**(1) 什么是模块化**:

模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元。



**(2) 编程领域中的模块化**

编程领域中的模块化，就是遵守固定的规则，把一个大文件拆成**独立并互相依赖**的多个小模块。

==好处==：

- 提高了代码的复用性
- 提高了代码的可维护性
- 可以实现按需加载



**(3) 模块化的规范**

模块化规范就是对代码进行模块化的拆分与组合时，需要**遵守的规则**：

比如：

- 使用什么样的语法格式来引用模块
- 在模块中使用什么样的语法格式向外暴露成员

==好处==：

遵守同样的模块化规范写代码，降低了沟通的成本，极大方便了各个模块之间的相互调用,利人利己。



### 6.2 模块的分类

Node.js 中根据模块来源的不同，将模块分为了3大类，分别是:

- **内置模块**：内置模块是由Node.js 官方提供的，例如fs、path、http等
- **自定义模块**：用户创建的每个.js 文件，都是自定义模块
- **第三方模块**：由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载



### 6.3 加载模块

(1)使用require()方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。

```js
//加载内置模块
const fs=require('fs');

//加载用户自定义模块,需要给出路径,并且可以省略js代码的扩展名
const custom=require('./custom.js');
const custom=require('./custom');// 这两行代码效果相同

//加载第三方模块，与加载内置模块类似
const moment=require('moment');
```

注意 : 使用require()方法加载其他模块时，会<span style="color:red">**执行被加载模块中的代码**</span>。



### 6.4 模块作用域

**(1) 什么是模块作用域**

和函数作用域类似，在自定义模块中定义的变量、方法等成员，**只能在当前模块内被访问**，这种模块级别的访问限制，叫做模块作用域。

如：

- B.js中有变量 username=‘ 张三 ’ , 在A.js中导入了const B=B.js , 在A.js中 执行consloe.log(B),打印的是一个空对象 { }.



**(2) 模块作用域的好处**

防止了全局变量污染的问题



### 6.5 向外共享模块作用域中的成员

#### 6.5.1 module 对象

在每个 **.js** 自定义模块中**都有一个module对象**，它里面**存储了和当前模块有关的信息**，打印如下:

```
Module {
  id: '.',
  path: 'c:\\Users\\Administrator\\Desktop\\lx',
  exports: {},
  filename: 'c:\\Users\\Administrator\\Desktop\\lx\\node练习.js',
  loaded: false,
  children: [],
  paths: [
    'c:\\Users\\Administrator\\Desktop\\lx\\node_modules',
    'c:\\Users\\Administrator\\Desktop\\node_modules',
    'c:\\Users\\Administrator\\node_modules',
    'c:\\Users\\node_modules',
    'c:\\node_modules'
  ]
}
```

打印了 存储路径、暴露对象等等信息



#### 6.5.2 module.exports 对象

在自定义模块中，可以使用**module.exports对象，将模块内的成员共享出去，供外界使用**。

外界用require()方法导入自定义模块时，其实**得到的就是module.exports 所指向的对象**。



**使用exports向外共享成员**：

```js
module.exports.想要共享的成员
```



**注意：**

使用require()方法导入模块时，导入的结果，永远**以module.exports 指向的对象为准**。



#### 6.5.3 exports 对象

由于module.exports单词写起来比较复杂，为了简化向外共享成员的代码，Node提供了exports对象。默认情况下，**exports和module.exports 指向同一个对象**。**最终共享的结果，还是以module.exports指向的对象为准**。



#### 6.5.4 exports 和 module.exports 的使用误区

时刻谨记,require()模块时，得到的**==永远==是module.exports指向的对象**,

注意:为了防止混乱，建议不要在同一个模块中同时使用exports和module.exports



### 6. 6 模块化规范

Nodejs遵循了CommonJS模块化规范，CommonJS规定了模块的特性和各模块之间如何相互依赖。

CommonJS规定 :

- 每个模块内部,module变量代表当前模块。
- module变量是一个对象，它的exports属性(即module.exports）是对外的接口。
- 加载某个模块，其实是加载该模块的module.exports属性。require)方法用于加载模块。



## 7. npm与包

### 7.1 包的概念与安装

Node.js 中的**第三方模块又叫做包**。



**包的来源及作用**：

- 包是由第三方个人或团队开发出来的，免费供所有人使用。
- 包是基于内置模块封装出来的，提供了更高级、更方便的API，极大的**提高了开发效率**。
- npm,lnc公司的网站 https://www.npmjs.com/ ，是全球最大的包共享平台【在这里搜索需要的包】
- npm, Inc.公司提供了一个地址为 https://registry.npmjs.org/ 的服务器，来对外共享所有的包，【在这里下载包】。
  

**如何下载包：**

- npm, Inc.公司提供了一个包管理工具，可以从 https://registry.npmjs.orgl 服务器把需要的包下载到本地使用。
- 这个包管理工具的名字叫做**Node Package Manager(简称npm包管理工具)**，这个包管理工具随着Node.js的安装包安装到了用户的电脑上。
- 可以在终端执行 npm -v,来才看npm包管理工具版本



**在项目中安装包的命令**:

如果想在项目中安装指定名称的包，需要在**终端运行**如下的命令:

```js
npm install 包的完整名称
或
npm i 包的完整名称

或安装多个包【用空格隔开】
npm i 包1  包2，。。。

或 一次性安装所有依赖包
npm install 和 npm i
```

**在项目中安装指定版本的包的命令**：

默认情况下，使用npm install 命令安装包的时候，会自动安装最新版本的包。如果需要安装指定版本的包，可以在包名之后，通过**@**符号指定具体的版本。例如:

```
npm i moment@2.22.2
```



**安装包后多出的文件**：

初次装包完成后，在项目文件夹下多一个叫做**node modules**的文件夹和**package-lock.json**的配置文件。

其中：【不要修改这些文件】

- **node_modules**文件夹：用来存放所有已安装到项目中的包。require()导入第三方包时，就是从这个目录中查找并加载包。
- **package-lock.json配置文件**：用来记录node_ modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。



**包的颁布规范**：

包的版本号是以“点分十进制”形式进行定义的，总共有三位数字，例如2.24.0

第1位数字:大版本

第2位数字:功能版本

第3位数字:Bug修复版本

版本号提升的规则:只要前面的版本号增长了，则后面的版本号归零。

### 7.2 包管理配置文件

npm规定，在项目根目录中，必须提供一个叫做package.json的包管理配置文件。用来记录与项目有关的一些配置信息。


**(1) 多人协作的问题**

很多时候 整个项目的体积中，第三方包占比总是非常大，不方便上传，而实际上第三方包只要有网络，就可以下载，所以实际上只需要标记使用了哪些包，让别人需要使用的时候去下载即可

即：

**第三方包的体积过大**，不方便团队成员之间共享项目源代码。



==解决方式==：

共亨时剔除node_modules，并记录项目中使用的包



**(2) 如何记录项目中安装了哪些包**

在**项目根目录中，创建一个叫做package.json的配置文件**，即可用来记录项目中安装了哪些包。从而方便剔除node_modules目录之后，在团队成员之间共享项目的源代码。



注意：今后在项目开发中，一定<span style="color:red">要把 node_modules文件夹，添加到.gitignore忽略文件中</span>。

#### 7.2.1 快速创建package.json

npm包管理工具提供了一个快捷命令，可以在执行命令时所处的目录中，快速创建package.json这个包管理配置文件:

```
npm init -y
```

注意：

- 上述命令只能在英文的目录下成功运行!所以，项目文件夹的名称一定要使用英文命名，不要使用中文，不能出现空格。
- 运行npm install 命令安装包的时候，npm包管理工具会自动把包的名称和版本号，记录到package.json中。



#### 7.2.2 dependencies节点

- package.json文件中，有一个dependencies节点，专门用来**记录您使用npm install命令安装了哪些包**【直接打开package.json是没有这个节点的，只有执行装包命令 npm i  包名 才会创建】。
- 如果某些包在**开发和项目上线之后都需要**用到，则建议把这些包记录到dependencies 节点中。



#### 7.2.3 一次性安装所有的包

当拿到一个剔除了node_modules 的项目之后，需要先把所有的包下载到项目中，才能将项目运行起来。



```js
//执行npm install命令时，npm包管理工具会先读取 package.json 中的 dependencies节点,
//读取到记录的所有依赖包名称和版本号之后，npm包管理工具会把这些包一次性下载到项目中

npm install 和 npm i
```



#### 7.2.4 卸载包

可以运行npm uninstall命令，来卸载指定的包:

```js
npm uninstall 包名
```

==注意==：

- npm uninstall命令执行成功后，会把卸载的包，自动从package.json的dependencies 中移除掉。



#### 7.2.5 devDependencies节点

如果某些包只在==**项目开发阶段会用到，在项目上线之后不会用到**==，则建议把这些包记录到**devDependencies** 节点中。

可以使用如下的命令，将包记录到devDependencies节点中:

```js
//安装指定的包，并记录到devDependencies节点中
npm i 包名 -D

//注意:上述命令是简写形式，等价于下面完整的写法:
npm install 包名 --save-dev
```



### 7.3 下包速度慢的解决方式

在使用npm下包的时候，默认从国外的https://registry.npmjs.org/服务器进行下载，因此下包速度会很慢。

**解决方式：**

**淘宝npm镜像服务器**

淘宝在搭建了一个服务器，把国外服务器上的包同步到国内的服务器，然后在国内提供下包的服务。



**镜像**：

镜像(Mirroring)是一种文件存储形式，一个磁盘上的数据在另一个磁盘上存在一个完全相同的副本即为镜像。



#### 7.3.1 切换npm的下包镜像源

下包的镜像源，指的就是下包的服务器地址，在终端中输入以下命令。

```
#查看当前的下包镜像源
npm config get registry

#将下包的镜像源切换为淘宝镜像源
npm config set registry="淘宝镜像源地址"//https://registry.npmmirror.com

#检查镜像源是否下载成功
npm config get registry
```



**nrm切换下包镜像源工具**

为了更方便的切换下包的镜像源，我们可以安装nrm这个小工具，利用nrm 提供的终端命令，可以快速查看和切换下包的镜像源。

```
#通过npm包管理器，将nrm安装为全局可用的工具
npm i nrm -g

#查看所有可用的镜像源
nrm ls

#将下包的镜像源切换为taobao镜像
nrm use taobao

```



### 7.4 包的分类

#### 7.4.1 项目包

那些被安装到项目的node_modules目录中的包，都是项目包。

项目包分为两类：

**开发依赖包**：被记录到devDependencies节点中的包，只在开发期间会用到

**核心依赖包**：被记录到 dependencies节点中的包，在开发期间和项目上线之后都会用到

```
npm i 包名 -D   #开发依赖包(会被记录到devDependencies节点下)

npm i 包名   #核心依赖包(会被记录到dependencies节点下)

```



#### 7.4.2 全局包

在执行npm install命令时，如果提供了 **-g** 参数，则会把包安装为**全局包**。

全局包会被安装到**C:\Users\用户目录AppData\Roaming\npm\node_modules**目录下。



**安装与卸载全局包**：

```
npm i 包名 -g  #全局安装指定的包

npm uninstall 包名 -g  #卸载全局安装的包
```

==注意==：

- 只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令。
- 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可。



 **i5ting_toc 包**:

i5ting _toc是一个可以把 md 文档转为html页面的小工具.



### 7.5 规范的包结构

一个规范的包，它的组成结构，必须符合以下3点要求:

- 包必须以单独的目录而存在
- 包的顶级目录下要必须包含package.json这个包管理配置文件
- package.json中必须包含name，version，main这三个属性，分别代表包的名字、版本号、包的入口。

### 7.6 开发一个包

**这个包实现的功能**：

- 格式化日期
- 转义HTML中的特殊字
- 符还原HTML中的特殊字符



（1) **基本结构**：

- 新建npm-tool文件夹，作为**包的根目录**

- 在npm-tool文件夹中，新建如下三个文件:

  - package.json(包管理配置文件)

  - index.js(包的入口文件)

  - README.md(包的说明文档)



(2) **初始化 package.json**

```json
{
    "name": "包名",
    "version": "版本号",
    "main": "指定包的入口文件",
    "description": "对包功能的描述信息",
    "keywords": ["搜索关键字","搜索关键字2",....],
    "license": "包所遵循的开源的许可协议【默认为ISC协议】"
}
```

**mian属性的作用**：假设 lx 文件夹下 有一个lx.js文件   package.json的 "main": "lx.js",此时当其他文件引入require('./lx')并没有给出完整路径，就会去寻找package.json的mian属性，来找到入口文件进而引入lx.js



(3) **在index.js中定义方法**

```js
//这是包的入口文件

// 格式化时间的方法
function dateFormat(dateStr) {
    const dt = new Date(dateStr);
    const y = padZero(dt.getFullYear());
    const m = padZero(dt.getMonth() + 1);//因为月份是从0开始，所以加1
    const d = padZero(dt.getDate());
    const hh = padZero(dt.getHours());
    const mm = padZero(dt.getMinutes());
    const ss = padZero(dt.getSeconds());

    return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`;
}


// 补零的方法
function padZero(n) {
    return n > 9 ? n : '0' + n;
}

//转义HTML的方法
function htmlEscape(htmlStr) {
    //g表示为全局匹配，会把符合条件的项都进行匹配
    //  | 表示或
    return htmlStr.replace(/<|>|"|&/g, (match) => {
        switch (match) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case '&':
                return '&amp;';
        }
    })
}


function htmlUnEscape(Str) {
    //g表示为全局匹配，会把符合条件的项都进行匹配
    //  | 表示或
    return Str.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch (match) {
            case '&lt;':
                return '<';
            case '&gt;':
                return '>';
            case '&quot;':
                return '"';
            case '&amp;':
                return '&';
        }
    })
}


module.exports = {
    dateFormat,
    htmlEscape,
    htmlUnEscape
}
```



(4) **将不同的功能进行模块化拆分**

- 将格式化时间的功能，拆分到src -> dateFormat.js 中
- 将处理HTML字符串的功能，拆分到src -> htmlEscape.js 中
- 在index.js 中，导入两个模块，得到需要向外共享的方法
- 在index.js 中，使用module.exports把对应的方法共享出去

```js
//这是包的入口文件


const date=require('./dateFormat');
const escape=require('./htmlEscape')

// console.log(escape);打印结果为
// {
//     htmlEscape: [Function: htmlEscape],
//     htmlUnEscape: [Function: htmlUnEscape]
//   }

module.exports = {
   ...date,
   ...escape
}
```



(5) **编写包的说明文档**

包根目录中的README.md文件，是包的使用说明文档。事先把包的使用说明，以markdown的格式写出来，方便用户参考。

我们所创建的这个包的 README.md文档中，会包含以下6项内容:

安装方式、导入方式、格式化时间、转义HTML中的特殊字符、还原HTML 中的特殊字符、开源协议



### 7.7 发布包

#### 7.7.1 npm账号

**(1) 注册**

- 访问https://www.npmjs.com/网站 sign up按钮,讲入注册用户界面
- 填写账号相关的信息:Full Name、Public Email、Username、Password【Public Email、Username、Password 必须记住，因为发布包时需要使用】
- 登录邮箱，点击验证链接，进行账号的验证

**(2) 登录**

npm账号注册完成后，可以在**终端**中执行 ==**npm login**== 命令，依次输入用户名、密码、邮箱后，即可登录成功。

==注意==：在运行npm login命令之前，必须先把下包的**服务器地址切换为npm的官方服务器**。否则会导致发布包失败!



#### 7.7.2 发布包到npm

将终端切换到包的根目录之后，运行 ==**npm publish**== 命令，即可将包发布到npm上(注意:包名不能雷同)。



#### 7.7.3 删除已发布的包

运行 ==**npm unpublish 包名 --force**==   命令，即可从npm删除已发布的包。

**注意：**

- npm unpublish命令只能删除72小时以内发布的包
- npm unpublish删除的包，在24小时内不允许重复发布
- 发布包的时候要慎重，尽量不要往npm 上发布没有意义的包!



## 8. 模块的加载机制

### 8.1 模块会优先从缓存中加载

**模块在第一次加载后会被缓存**。这也意味着多次调用require()不会导致模块的代码被执行多次。

注意:不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。



### 8.2 内置模块的加载机制

内置模块是由Node.js官方提供的模块，内置模块的加载优先级最高。

例如：require('fs')始终返回内置的fs模块，即使在node_modules目录下有名字相同的包也叫做fs。



### 8.3 自定义模块的加载机制

使用require()加载自定义模块时，**必须指定以./或../开头的路径标识符**。在加载自定义模块时，如果没有指定./或../这样的路径标识符，则node会把它当作内置模块或第三方模块进行加载。



注意：同时，在使用require()导入自定义模块时，如果省略了文件的扩展名，则Node.js 会按顺序分别尝试加载以下的文件:

1.  按照确切的文件名进行加载
2.  补全.js扩展名进行加载
3.  补全.json扩展名进行加载
4.  补全.node扩展名进行加载
5.  加载失败，终端报错



### 8.4 第三方模块的加载机制

如果传递给require()的模块标识符不是一个内置模块，也没有以 './ '或'../'开头，则Node.,js 会从当前模块的父目录开始，尝试从/node_modules 支件夹中加载第三方模块。

**如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录**。



### 8.5 目录作为模块

当把目录作为模块标识符，传递给require(进行加载的时候，有三种加载方式:

- 在被加载的目录下查找一个叫做package.json的文件，并寻找main属性，作为require()加载的入口
- 如果目录里没有package.json文件，或者main 入口不存在或无法解析，则Node.js将会试图加载目录下的 index.js文件。
- 如果以上两步都失败了，则Node.js会在终端打印错误消息。报告模块的缺失:Error: Cannot find module 'xxx’'



# 二、Express

**什么是Express**：

官方给出的概念 : Express是基于Node.js 平台，快速、开放、极简的Web开发框架。

通俗的理解 : Express的作用和Node.js内置的http模块类似，是专门用来创建Web 服务器的。

Express的本质 : 就是一个npm 上的第三方包，提供了快速创建Web 服务器的便捷方法。

Express的中文官网:http://www.expressjs.com.cn/



**功能：**

对于前端程序员来说，最常见的两种服务器，分别是:

- Web 网站服务器 : 专门对外提供Web 网页资源的服务器。
- API接口服务器 : 专门对外提供API接口的服务器。

使用Express可以方便、快速的创建Web 网站的服务器或API接口的服务器。



## 1. Express基本使用

**安装Express**:

在项目所处的目录中，运行如下的终端命令，即可将express安装到项目中使用:

```
npm i express@4.17.1
```

### 1.1 创建基本的Web服务器

```js
// 导入 express
const express=require('express');
//创建 web服务器
const app=express();

//调用app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80,()=>{
    console.log('server running at http://127.0.0.1:80')
})
```



### 1.2 监听GET,POST请求

通过app.get()方法，可以监听客户端的GET请求，具体的语法格式如下:

```js
//参数1:客户端请求的URL地址
//参数2:请求对应的处理函数l/
//req:请求对象(包含了与请求相关的属性与方法)
//res:响应对象(包含了与响应相关的属性与方法)
app.get('请求URL'，function(req，res) {/*处理函数*/ })
app.get('请求URL'，function(req，res) {/*处理函数*/ })
```



### 1.3 把内容响应给客户端-send

通过res.send()方法，可以把处理好的内容，发送给客户端:

```js
app.get('/user', (req,res) =>{
  //向客户瀹发送JSON 对象
res.send({name: 'zs',age: 20,gender: '男'}
});

app.post( '/user',(req,res) =>{
//向客户端发送文本内容
res.send('请求成功');
})
```

==补充==： res.send()既可以响应一个json对象【**输入js对象的话，在响应时会转换成json对象**】，也可以响应一个普通的文本



### 1.4 获取URL中携带的查询参数-query

通过==**req.query**==对象，可以访问到客户端通过**查询字符串**的形式，发送到服务器的参数:

```js
app.get( '/', (req,res) => {
// req.query 默认是一个空对象
//客户端使用 ?name=zs&age=20 这种查询字符串形式，发送到服务器的参数，
//可以通过req.query对象访问到，例如:
//req.query.name   req.query.age
    console.log(req.query)
})

```



### 1.5 获取URL中的动态参数-params

通过==**req.params**==对象，可以访问到URL中，通过 ==**:**==  匹配到的**动态参数**:

```js
// URL地址中，可以通过:参数名的形式，匹配动态参数值
app.get( '/user/:id', (req,res) =>{
//req.params 默认是一个空对象
//里面存放着通过:动态匹配到的参数值
    console.log(req.params)
})

```

注意：

- 匹配的参数名字是什么都可以，它只会影响响应的json对象的键
- 可以匹配多个参数，如/user/:id/:name/:age , 
  - 此时如果请求地址是http://127.0.0.1/1/zs/18 
  - 则打印的json对象为{"id":"3","name":"zs","age":"18"}



## 2. 托管静态资源

### 2.1 express.static()

通过express.static()，可以非常方便地创建一个静态资源服务器,

例如，通过如下代码就可以将public目录下的图片、CSS文件、JavaScript 文件对外开放访问了:

```js
app.use(express.static('public'));
```

**注意**:

- Express在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态文件的目录名不会出现在URL中。
- app.use()的作用是注册全局中间件

### 2.2 托管多个静态资源目录

如果要托管多个静态资源目录，需要多次调用express.static()函数:

```js
app.use(express.static('public'));
app.use(express.static('files'));

```

访问静态资源文件时，express.static()函数会根据目录的添加顺序查找所需的文件,

即如果public，files文件夹都有名为index.html的文件，因为public写在前面所以会优先读取public中的，假设public中没有index.html文件才会去files中找。



### 2.3 挂载路径前缀-use('前缀',中间件)

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式:

```js
app.use('/public',express.static('public'));
```

则如果想要访问这个目录下的文件，就必须加上/public前缀



## 3. Express路由

**什么是路由：**

广义上来讲，路由就是**映射关系**。

### 3.1 Express路由的概念

**(1) Express中的路由**

在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

Express 中的路由分3部分组成，分别是**请求的类型**、**请求的URL地址**、**处理函数**，格式如下;

```js
app.METHOD(PATH,HANDELR);
```

例子：

```js
//匹配GET请求,且请求URL为 /
app.get('/',function(req,res){
    res.send('hello');
})
```



**(2) 路由的匹配过程**

每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。

在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的URL同时匹配成功，则 Express 会将这次请求，转交给对应的function 函教进行处理。

<img src="tu/路由的匹配过程.png">

路由匹配的注意点:

- 按照定义的先后顺序进行匹配
- 请求类型和请求的URL同时匹配成功，才会调用对应的处理函数



### 3.2 路由的使用

**(1) 基本使用**

```js
// 导入 express
const express=require('express');
//创建 web服务器
const app=express();

//挂载路由
app.get('/',(req,res)=>{
    res.send('hello world');
})

app.post('/',(req,res)=>{
    res.send('post');
})


//调用app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80,()=>{
    console.log('server running at http://127.0.0.1:80')
})
```



**(2) 模块化路由**

为了方便对路由进行模块化的管理，**Express 不建议将路由直接挂载到app 上**，而是推荐将路由抽离为单独的模块。

步骤：

1.  创建路由模块对应的.js 文件
2.  调用**express.Router()**函数创建路由对象
3.  向路由对象上挂载具体的路由
4.  使用module.exports向外共享路由对象
5.  使用app.use()函数注册路由模块

```js
//在入口函数中//
// 导入 express
const express=require('express');
//创建 web服务器
const app=express();

//导入路由模块
const router=require('./路由模块');

//注册路由模块
app.use(router);

//调用app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80,()=>{
    console.log('server running at http://127.0.0.1:80')
})
```

```js
//在router模块中//
// 导入 express
const express=require('express');
//创建 web服务器
const router=express.Router();

//挂载路由
router.get('/',(req,res)=>{
    res.send('hello world');
})

router.post('/',(req,res)=>{
    res.send('post');
})

module.exports=router;
```



### 3.3 为路由模块添加前缀

```js
//导入路由模块
const userRouter=require('');

//使用app.use()注册路由模块，并添加统一的访问前缀 /api
app.use('/api',userRouter);
```



## 4. Express中间件

### 4.1中间件的概念

**什么是中间件**：

中间件(Middleware )：特指业务流程的**中间处理环节**。



**Express中间件的调用流程**：

当一个请求到达Express的服务器之后，可以连续调用多个中间件，从而对这次请求进行**预处理**。

<img src="tu/中间件的调用流程.png">



**Express中间件的格式：**

Express的中间件，本质上就是一个function处理函数，Express中间件的格式如下:

<img src="tu/中间件的格式.png">

注意:

- 中间件函数的形参列表中，必须包含next参数。
- 路由处理函数中只包含req和res



**next函数的作用：**

next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。



### 4.2 中间件的基本使用

#### 4.2.1 定义中间件函数

```js
const express=require('express');
const app=express();

//定义简单的中间件
const md=function(req,res,next){
    console.log('简单的中间件函数');
    next();//把流转关系。转交给下一个中间件或路由
}

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})
```



#### 4.2.2 全局生效的中间件-use()

客户端发起的任何请求，到**达服务器之后，都会触发的中间件，叫做全局生效的中间件**。

通过调用==**app.use(中间件函数)**==，即可定义一个全局生效的中间件

```js
const md=function(req,res,next){
    console.log('简单的中间件函数');
    next();
}
//全局生效的中间件
app.use(md);
```



**简化写法**：

```js
app.use(function(req,res,next){
    console.log('简单的中间件函数');
    next();
});
```



#### 4.2.3 中间件的作用

<span style="color:red">多个中间件之间，共享同一份req和res</span>。基于这样的特性，可以在上游的中间件中，统一为req或res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。



#### 4.2.4 定义多个全局中间件

可以使用app.use()连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依调用，示例代码如下:

```js
const express=require('express');
const app=express();

//定义简单的中间件
app.use((req,res,next)=>{
    console.log('调用了第一个全局中间件');
    next()
})

app.use((req,res,next)=>{
    console.log('调用了第二个全局中间件');
    next()
})

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})

// 输出结果为:
// http://127.0.0.1
// 调用了第一个全局中间件
// 调用了第二个全局中间件
```



#### 4.2.5 局部生效的中间件

**不使用app.use()**定义的中间件，叫做局部生效的中间件：

```js
const express=require('express');
const app=express();

const mw =function(req,res,next){
     console.log('这是局部中间件');
     next();
}

// mw这个中间件只在"当前路由中生效"，这种用法属于"局部生效的中间件"
app.get('/',mw,function(req,res){
    res.send('hello')
})

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})
```



#### 4.2.6 定义多个局部中间件

可以在路由中，通过如下两种**等价** 的方式，使用多个同部中间件:

```js
app.get('/',mw1,mw2,function(req,res){})

app.get('/',[mw1,mw2],function(req,res){})
```



#### 4.2.7 中间件的注意事项

- 一定要**在路由之前注册**中间件
- 客户端发送过来的请求，可以连续调用多个中间件进行处理
- 执行完中间件的业务代码之后，不要忘记调用next()函数
- 为了防止代码逻辑混乱，调用next(函数后不要再写额外的代码
- 连续调用多个中间件时，多个中间件之间,共享req和res 对象



### 4.3 中间件的分类

为了方便理解和记忆中间件的使用，Express官方把常见的中间件用法，分成了5大类，分别是:

1.  应用级别的中间件
2.  路由级别的中间件
3.  错误级别的中间件
4.  Express内置的中间件
5.  第三方的中间件



#### 4.3.1 应用级别与路由级别的中间件

- 通过app.use()或app.get()或 app.post()，**只要是绑定到 app实例上的中间件**，叫做应用级别的中间件
- **绑定到express.Router()实例上的中间件**,叫做路由级别的中间件。



#### 4.3.2 错误级别的中间件

错误级别中间件的作用 : 专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

格式 : 错误级别中间件的function处理函数中，<span style="color:red">必须有4个形参</span>，形参顺序从前到后，分别是**(err, req, res, next)**。

```js
const express=require('express');
const app=express();

app.get('/',(req,res)=>{ //路由
    throw new Error('服务器内部发生了错误') //抛出一个错误
    //因为上面抛出了错误，导致代码到这里就无法执行
    //需要错误中间件捕获这次错误，并给出相应的处理,来防止出错后程序崩溃
    res.send('home page')
})

app.use((err,req,res,next)=>{    //错误级别的中间件
    console.log('发生了错误!'+err.message); //在服务器打印错误消息
    res.send('error!'+err.message);  //向客户端响应错误发送相关内容
})

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})

//结果:
//服务器响: 'error'+err.message 即 error!服务器内部发生了错误
//控制台打印: 发生了错误!服务器内部发生了错误
```

<span style="color:red">错误级别的中间件,必须注册在所有**路由**之后!</span>.



#### 4.3.3 express内置的中间件

- express.static 快速托管静态资源的内置中间件，例如:HTML文件、图片、CSS样式等（无兼容性)
- express.json 解析JSON格式的请求体数据（有兼容性，仅在4.16.0+版本中可用)
- express.urlencoded 解析URL-encoded格式的请求体数据（有兼容性，仅在4.16.0+版本中可用)

==使用方式==：

```js
//配置解析applicationljson格式数据的内置中间件
app.use(express.json())

//配置解析application/x-ww-form-urlencoded格式数据的内置中间件
app.use(express.urlencoded({extended: false }))//固定写法
```

例子：express.urlencoded的例子与这个同理

```js
//假设请求携带的数据为json格式的数据，
{
    "name":"zs",
    "age":20
}

const express=require('express');
const app=express();

//注意:除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
//通过express.json()这个中间件，解析表单中的JSON格式的数据
app.use(express.json());

app.post('/user',(req,res)=>{ 

  //  在服务器，可以使用req. body 这个属性，来接收客户端发送过来的请求体数据
  //默认情况下，如果不配置解析表单数据的中间件(因为此次发起的请求携带的数据是json格式)，则req.body默认等于undefined
    console.log(req.body); //若加上解析中间件打印 { name: 'zs', age: 20 }
    res.send('home page')
})

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})
```



#### 4.3.4 第三方的中间件

在项目中，可以按需下载并配置第三方中间件，从而提高项目的开发效率。

使用步骤：

- 运行npm install 包名   (安装中间件)
- 使用require (导入中间件)
- 调用app.use()  (注册并使用中间件)



### 4.4 自定义中间件

模拟类似于express.urlencoded 这样的中间件，来解析POST提交到服务器的表单数据。

步骤：

1.  定义中间件
2.  监听req的data事件
3.  监听req 的end事件
4.  使用querystring模块解析请求体数据
5.  将解析出来的数据对象挂载为req.body
6.  将自定义中间件封装为模块

**定义中间件**

```js
const express=require('express');
const app=express();
//解析表单数据的中间件
app.use((req,res,next)=>{
})
```



**监听req的data事件**:

在中间件中，需要监听req对象的 data事件，来获取客户端发送到服务器的数据。

如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。

所以data事件可能会触发多次，每一次触发data事件时，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接。

```js
  //定义变量，用来存储客户实发送过来的请求体数据
    let str = '';
    //监听req对象的data 事件(客户端发送过来的新的请求体数据)
    req.on('data', (chunk) => {
    //拼接消清承体数据，隐式转换为字符串
        str += chunk;
    })
```



**监听req的end事件**:

当请求体数据==**接收完毕之后，会自动触发req的end事件**==。

因此，可以在req 的end事件中，拿到并处理完整的请求体数据。示例代码如下;

```js
  //监听req对象的end 事件（请求体发送完毕后自动触发)
    req.on('end', () => {
        //此时str中存放的是完整的请求体数据
        console.log(str)
    })
```



**使用querystring模块解析请求体数据**:

Node.js 内置了一个==**querystring模块，专门用来处理查询字符串**==。通过这个模块提供的 ==**parse()**==函数，可以把查询字符串，解析成对象的格式。

querystring.parse()方法用于将URL查询字符串解析为包含查询URL的键和对值的对象。

示例代码如下:

注意：<span style="color:red">querystring已经弃用了,官方推荐使用URLSearchParams对象</span>

```js
const qs=require('querystring'); 
    req.on('end', () => {
      const body= qs.parse(str);
      console.log(body);
    })
//设请求的携带的数据是application/x-www-form-urlencoded格式
//转换为字符串后为str为:name=zs&age=18
//[Object: null prototype] { name: 'zs', age: '18' }

 req.on('end', () => {
     const myURL=new URL("http://127.0.0.1/?"+str);
     myURL.searchParams.forEach((value,name,searchParams)=>{
        console.log(name,value,myURL.searchParams===searchParams);
     })
    })
//打印为:
//name zs true
//age 18 true
```



**将解析出来的数据对象挂载为req.body**

中间件及路由之间，共享同一份req和res。因此，可以将解析出来的数据，挂载为req的自定义属性。命名为req.body,供下游使用。示例代码如下:

```js
  req.on('end', () => {
        const body = qs.parse(str);
        req.body = body;
        next();
    })
```



**将自定义中间件封装为模块**





### 4.5 使用express写接口

入口文件：

```js
const express = require('express');
const app = express();
const apiRouter=require('./路由模块');


//配置解析表单数据的中间件
//这里必须在写在路由模块注册在app之前，因为
//除了错误级别的中间件，其他的中间件，必须在路由之前进行配置,不然无法解析数据
app.use(express.urlencoded({extended:false}))

app.use('/api',apiRouter)
app.listen(80, () => {
    console.log('http://127.0.0.1');
})
```



路由模块：

```js
const express=require('express');
const apiRouter=express.Router();


apiRouter.get('/get',(req,res)=>{
    // 获取客户端通过 查询字符串 发送到 服务器的数据
    const query=req.query;
    // 调用res.send(),把数据响应给客户端
    res.send({
        status:0,    // 状态,0表示成功,1表示失败
        mas:'GET请求成功',  //状态描述
        data:query   //需要响应给客户端的具体数据
    })
})

apiRouter.post('/post',(req,res)=>{
    // 获取客户端通过 请求体 发送到 服务器的URL-encoded数据
    const body=req.body;
    console.log(body);
    // 调用res.send(),把数据响应给客户端
    res.send({
        status:0,    // 状态,0表示成功,1表示失败
        mag:'POST请求成功',  //状态描述
        data:body   //需要响应给客户端的具体数据
    })
})

module.exports=apiRouter;
```



#### 4.5.1 解决跨域问题-cors

如果仅仅只是以上代码，无法解决跨域问题

解决接口跨域问题的方案主要有两种:

- CORS(主流的解决方案，推荐使用)
- JSONP(有缺陷的解决方案:只支持GET请求)

```js
//一定要在路由之前，配置 cors 这个中问件，从而解决接口跨域的问题
const cors=require('cors')
app.use(cors());

//路由
app.use('/api',apiRouter)
```

具体见案例<a href="./编写接口及cors的使用">编写接口</a>



### 4.6 CORS跨域资源共享

#### 4.6.1 什么是cors

CORS(Cross-Origin Resource Sharing，跨域资源共享）由一系列HTTP响应头组成，**这些HTTP响应头决定浏览器是否阻止前端JS代码跨域获取资源**。

浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了CORS相关的HTTP响应头，就**可以解除浏览器端的跨域访问限制**。


**(2) 注意事项**

- CORS主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了CORS的接口。
- CORS在浏览器中有兼容性。只有支持XMLHttpRequest Level2的浏览器，才能正常访问开启了CORS的服务端接口(例如:IE10+、Chrome4+、FireFox3.5+) 



#### 4.6.2  cors相关的三个响应头 Origin Headers Methods

**(1) CORS响应头部–Access-Control-Allow-Origin**

响应头部中可以携带一个**Access-Control-Allow-Origin**字段，其语法如下:

```js
Access-Control-Allow-Origin:<origin> | *;

//origin 既可以是是一个具体的url地址也可以是一个 *
```

其中,origin 参数的值指定了允许访问该资源的外域URL。

例如，下面的字段值将只允许来自http://itcast.cn的请求:

```js
res.setHeader('Access-Control-Allow-Origin','http://itecast.cn');
```

如果指定了Access-Control-Allow-Origin字段的值为通配符*，表示允许来自任何域的请求，示例代码如下:

```
res.setHeader('Access-Control-Allow-Origin','*');
```



**(2) CORS响应头部–Access-Control-Allow-Headers**

**默认**情况下，==**CORS 仅支持客户端向服务器发送如下的9个请求头**==:

Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type(值仅限于text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一)



如果客户端向服务器发送了**额外的请求头信息**，则需要在服务器端，通过Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败!

```js
//允许客户端额外向服务器发送 Content-Type 请求头 和 X-Custom-Header 请求头
//注意:多个请求头之间使用英文的逗号进行分割
res.setHeader( 'Access-Control-Allow-Headers','Content-Type,X-Custom-Header')
```



**(3)  CORS响应头部–Access-Control-Allow-Methods**

默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求。

如果客户端希望**通过==PUT、DELETE==等方式请求服务器的资源**，则需要在服务器端，通过**Access-Control-Alow-Methods**来指明实际请求所允许使用的HTTP方法。

```js
//只允许POST、GET、DELETE、HEAD请求方法
res.setHeader ( 'Access-Control-Allow-Methods','POST,GET,DELETE,HEAD')

//允许所有的 HTTP请求方法
res.setHeader( 'Access-Control-Allow-Methods','*')
```



#### 4.6.3 CORS请求的分类

客户端在请求CORS接口时，根据请求方式和请求头的不同，可以将CORS的请求分为两大类，分别是:

- 简单请求
- 预检请求



**(1) 简单请求**

同时满足以下两大条件的请求，就属于简单请求:

- 请求方式 : GET、POST、HEAD三者之一
- HTTP头部信息不超过以下几种字段:**无自定义头部字段**、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width .Content-Type (只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)



**(2) 预检请求**

只要符合以下**任何一个条件**的请求，都需要进行预检请求:

- 请求方式 : GET、POST、HEAD之外的请求Method类型
- 请求头中包含**无自定义头部字段**
- 向服务器发送了application/json格式的数据



什么是预检请求：

在浏览器与服务器正式**通信之前**，浏览器会**先**发送OPTION请求进行预检，以获知服务器是否允许该实际请求，所以这一次的OPTION请求称为“预检请求”。**服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据**。



**(3) 简单请求和预检请求**

简单请求的特点 : 客户端与服务器之间只会发生一次请求。

预检请求的特点: 客户端与服务器之间会发生两次请求，OPTION预检请求成功之后，才会发起真正的请求。



# 三、数据库与身份认证

## 1. 在项目中操作MySQL

步骤：

1.  安装操作MySQL 数据库的第三方模块(mysql)
2.  通过mysql模块连接到MySQL 数据库
3.  通过mysql模块执行SQL语句

<img src="tu/操作数据库.png">

### 1.1 安装与配置mysql模块

**(1) 安装**

mysql模块是托管于npm 上的第三方模块。它提供了在Node.js项目中连接和操作MySQL数据库的能力。
想要在项目中使用它，需要先运行如下命令，将 mysql安装为项目的依赖包:

```
npm i mysql
```



**(2) 配置mysql模块**

在使用mysql模块操作MySQL数据库之前，必须先对mysql模块进行必要的配置，主要的配置步骤如下:

```js
//1．导入 mysql模块
const mysql = require('mysql2')
//2．建立与 MySQL 数据库的连接
const db = mysql.createPool({
host: '127.0.0.1',      //数据库的IP地址
user: 'root',           //登录数据库的账号
password: '123456',   //登录数据库的密码
database: 'my_db'   //指定要操作哪个数据库
})
```



(3) 测试mysql模块能否正常运行

```js
db.query('select 1',(err,results)=>{
    if(err){ return console.log(err.message);}
    //只要打印出[RowDataPacket{'1':1}]的结果,就证明数据库连接正常
    console.log(results);
})
//打印结果  [ { '1': 1 } ]
```



### 1.2 使用mysql模块操作数据库

#### 1.2.1 查询数据

查询text表中所有的数据：

```js
db.query('SELECT * FROM account',(err,results)=>{
    //查询失败
    if(err){return console.log(err,message);}
    //查询成功
    //注意:如果执行的是select查询语句，则执行的结果results是数组
    console.log(results);
})
```

<span style="color:red">执行的是select查询语句，则执行的结果results是数组</span>.

#### 1.2.2 插入数据

向users表中新增数据，其中id为3，name为王五 ，money 为3000。示例代码如下

```js
//要插入到users表中的数据对象
const data = { id: 3, name: '王五', money: 3000 };

//待执行的SQL语句，其中英文的?表示占位符,
// 在sql语句中可以通过？的形式来进行数据的占位,将来用具体的值来替换掉？
const sqlStr = 'insert into nodejs (id,name,money) values (?,?,?)'

//使用数组的形式，依次为?占位符指定具体的值
db.query(sqlStr, [data.id, data.name, data.money], (err, results) => {
    if (err) { return console.log(err.message); } //失败
    //如果执行的是insert into插入语句，则执行的结果results是对象,其中的属性affectedRows=1时，表示插入成功
    if (results.affectedRows === 1) { console.log('插入数据成功'); }
})
```

<span style="color:red">执行的是insert into插入语句，则执行的结果results是对象,其中的属性affectedRows=1时，表示插入成功</span>.



**插入数据简化**：

向表中新增数据时，如果**数据对象的每个属性和数据表的字段一一对应**，则可以通过如下方式快速插入数据

```js
//要插入到users表中的数据对象
const data = { id: 4, name: '老六', money: 3000 };

//待执行的SQL语句，其中英文的?表示占位符,
// 在sql语句中可以通过？的形式来进行数据的占位,将来用具体的值来替换掉？
const sqlStr = 'insert into nodejs set ?'

//使用数组的形式，依次为?占位符指定具体的值
db.query(sqlStr, data, (err, results) => {
    if (err) { return console.log(err.message); } //失败
    //如果执行的是insert into插入语句，则执行的结果results是对象,其中的属性affectedRows=1时，表示插入成功
    if (results.affectedRows === 1) { console.log('插入数据成功'); }
})
```



#### 1.2.3 更新数据

```js
//要修改的users表中的数据对象
const data = { id: 4, name: '老六', money: 800 };
const sqlStr = 'update nodejs set id=?,name=? where money=?'
db.query(sqlStr, [data.id, data.name, data.money], (err, results) => {
    if (err) { return console.log(err.message); } //失败
    //如果执行的是update插入语句，则执行的结果results是对象,其中的属性affectedRows=1时，表示插入成功
    if (results.affectedRows === 1) { console.log('插入数据成功'); }
})
```



**便捷方式：**

```js
//要修改的users表中的数据对象
const data = { id: 4, name: '老六', money: 800 };
const sqlStr = 'update nodejs set ? where id=?'
db.query(sqlStr, [data, data.id], (err, results) => {
    if (err) { return console.log(err.message); } //失败
    //如果执行的是update插入语句，则执行的结果results是对象,其中的属性affectedRows=1时，表示插入成功
    if (results.affectedRows === 1) { console.log('插入数据成功'); }
})
```



#### 1.2.4 删除数据

在删除数据时，推荐根据id这样的唯一标识，来删除对应的数据。示例如下

```js
//1．要执行的SQL语句
const sqlStr = "DELETE FROM nodejs WHERE id=?"
//2．调用db.query()执行SQL语句的同时，为占位符指定具体的值
//注意:如果 SQL语句中有多个占位符，则必须使用数组为每个占位符指定具体的值
// 如果SQL语句中只有一个占位符，则可以省略数组
db.query(sqlStr, 3, (err, results) => {
    if (err) { return console.log(err.message) }//失败
    //注意:执行 delete语句之后，结果也是一个对象，也会包含affectedRows属性
    if (results.affectedRows === 1) { console.log('删除数据成功!')}
})
```



#### 1.2.5 标记删除

使用DELETE语句，会把真正的把数据从表中删除掉。为了保险起见，推荐使用标记删除的形式，来模拟删除的动作。

**标记删除**：

- 在表中设置类似于status这样的状态字段，来标记当前这条数据是否被删除。
- 当用户执行了删除的动作时，我们**并没有执行DELETE语句把数据删除掉**，而是**执行了UPDATE语句**，将这条数据对应的**status字段标记为删除**【这个status字段是自己添加的字段不是固有的】即可。

```js
//标记删除:使用UPDATE语句替代 DELETE语句;只更新数据的状态，并没有真正删除
db.query('UPDATE nodejs SET status=1 WHERE id=?', 3, (err, results) => {
    if (err) { return console.log(err.message) }//失败
    if (results.affectedRows=== 1){ console.log('标记删除数据成功!') }//成功
})
```



## 2. 前后端的身份认证

### 2.1 Web开发模式

#### 2.1.1 服务器渲染的Web开发模式

服务端渲染的概念: **服务器发送给客户端的HTML页面，是在服务器通过字符串的拼接，动态生成的**。因此，客户端不需要使用Ajax这样的技术额外请求页面的数据。代码示例如下:

```js
app.get("/index.html", (req, res) => {
    //1．要渲染的数据
    const user = { name: 'zs', age: 20 }
    // 2．服务器端通过字符串的拼接，动态生成 HTML内容
    const html = `<h1>姓名: ${user.name},年龄: ${user.age}</h1>`
    // 3．把生成成好的页面内容响应给客户端。因此，客户端拿到的是带有真实数据的 HTML页面
    res.send(html)
})
```



**服务器端渲染的优点：**

- **前端耗时少**。因为服务器端负责动态生成HTML内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。
- **有利于SEO**。因为服务器端响应的是完整的HTML页面内容，所以爬虫更容易爬取获得信息，更有利于SEO。



**服务器端渲染的缺点：**

- **占用服务器端资源**。即服务器端完成HTML页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力。
- **不利于前后端分离**，开发效率低。使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发。



#### 2.2.2 前后端分离的Web开发模式

前后端分离的概念 : 前后端分离的Web开发模式,就是**后端只负责提供API接口**，**前端使用Aiax调用接口**的开发模式。



**前后端分离优点：**

- **开发体验好**。前端专注于U页面的开发，后端专注于api的开发，且前端有更多的选择性。
- **用户体验好**。Ajax技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。
- **减轻了服务器端的渲染压力**。因为页面最终是在每个用户的浏览器中生成的。



**前后端分离缺点：**

- **不利于SEO**。因为完整的HTML页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。
- **解决方案** : 利用**Vue、React**等前端框架的**SSR** (server side render)技术能够很好的解决SEO问题! 



### 2.2 如何选择Web开发场景

- 比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的SEO，则这时我们就需要使用服务器端渲染;
- 而类似后台管理项目，交互性比较强，不需要考虑SEO，那么就可以使用前后端分离的开发模式。
- 具体使用何种开发模式并不是绝对的，为了同时兼顾了首页的渲染速度和前后端分离的开发效率，一些网站采用了首屏服务器端渲染＋其他页面前后端分离的开发模式。



### 2.3 身份认证

**什么是身份认证**：

身份认证(Authentication)又称“身份验证”、“鉴权”，是指**通过一定的手段，完成对用户身份的确认**。

- 日常生活中的身份认证随处可见，例如:高铁的验票乘车，手机的密码或指纹解锁，支付宝或微信的支付密码等。
- 在Web开发中，也涉及到用户身份的认证，例如:各大网站的手机验证码登录、邮箱密码登录、二维码登录等。



**为什么需要身份认证**：

身份认证的目的，是为了**确认当前所声称为某种身份的用户，确实是所声称的用户**。例如，你去找快递员取快递，你要怎么证明这份快递是你的。



**不同开发模式下的身份认证：**

对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案:

- 服务端渲染推荐使用 **Session认证机制**
- 前后端分离推荐使用 **JWT认证机制**



### 2.4 Session认证机制

#### 2.4.1 HTTP协议的无状态

了解HTTP协议的无状态性是学习Session认证机制的必要前提。

HTTP协议的无状态性：

- 指的是**客户端的每次HTTP请求都是独立的**，**连续多个请求之间没有直接的关系**，**服务器不会主动保留每次HTTP请求的状态**。



#### 2.4.2 突破HTTP无状态的限制-Cookie

**(1) 概念：**

对于超市来说，收银员无法准确记住哪些客户是vip，为了方便收银员在进行结算时给VIP用户打折，超市可以为每个VIP用户发放会员卡，来为他们做标识。

注意: 现实生活中的会员卡身份认证方式，在 Web 开发中的专业术语叫做Cookie.



**(2) 什么是Cookie**:在浏览器控制台中-Application-Storage中可查看

- Cookie 是<span style="color:red">存储在用户浏览器中的一段不超过4KB的字符串</span>。它由一个**名称**(Name)、一个**值(**Value)和其它几个用于控制Cookie**有效期、安全性、使用范围**的==可选属性==组成。
- 不同域名下的Cookie各自独立，每当客户端发起请求时，**会自动把当前域名下所有未过期**的Cookie一同发送到服务器。



**(3) Cookie 的几大特性：**

1.  自动发送
2.  域名独立
3.  过期时限
4.  4 KB限制



**(4) Cookie在身份认证中的作用：**

客户端==**第一次**==请求服务器的时候，服务器**通过响应头的形式**，向客户端发送一个身份认证的Cookie，客户端会自动将Cookie保存在浏览器中。

随后，当客户端浏览器每次请求服务器的时候，浏览器会**自动**将身份认证相关的Cookie，**通过请求头**的形式发送给服务器，服务器即可验明客户端的身份。



**(5) Cookie不具备安全性**

由于Cookie 是存储在浏览器中的，而且浏览器也提供了读写Cookie的API，因此Cookie,很容易被伪造，不具有安全性。因此不建议服务器将重要的隐私数据，通过Cookie的形式发送给浏览器。

注意: 千万不要使用Cookie存储重要且隐私的数据!比如用户的身份信息、密码等。



**(6) 提高身份认证的安全性**

为了防止客户伪造会员卡，收银员在拿到客户出示的会员卡之后，可以在收银机上进行刷卡认证。**只有收银机确认存在的会员卡**，才能被正常使用。

“会员卡＋刷卡认证” 的设计理念，就是Session认证机制的精髓。



#### 2.4.3 Session的工作原理

<img src="tu/session工作原理.png">





#### 2.4.4 安装与配置express-session中间件

**(1) 安装**

在Express项目中，只需要安装express-session中间件，即可在项目中使用Session认证:

```
npm i express-session
```



**(2) 配置expresss-session中间件**

express-session中间件安装成功后，需要通过**app.use()来注册session中间件**，示例代码如下:

```js
const express = require('express');
const app = express();
var session = require('express-session');

//配置 session 中间件
app.use(session({
    secret: 'keyboard cat',   //secret 属性的值可以为任意字符串,负责对session加密
    resave: false,           // 固定写法
    saveUninitialized: true  //固定写法
}))
```



#### 2.4.5 向session中存数据

当express-session中间件配置成功后，即可通过**req.session**来访问和使用session对象，从而存储用户的关键信息:

```js
app.post('/api/login', (req, res) => {        //判断用户提交的登录信息是否正确
    if (req.body.username !== 'admin' || req.body.password !== '000000') {
        return res.send({ status: 1, msg: '登录失败' });
    }
    req.session.user = req.body;       //  将用户的信息，存储到Session中
    req.session.islogin = true;          //将用户的登录状态，存储到Session中
    res.send({ status: 0, msg: "登录成功" });
})
```



#### 2.4.6 从session中取数据

**可以直接从req.session对象上获取之前存储的数据**：

```js
// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  })
})
```



#### 2.4.7 清空session

调用**req.session.destroy()**函数，即可清空服务器保存的 session信息。

```js
// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})
```



### 2.5 JWT 认证机制

#### 2.5.1 session认证的局限性

Session认证机制需要配合Cookie 才能实现。由于Cookie默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域Session认证。



**注意**：

- 当前端请求后端接口不存在跨域问题的时候，推荐使用Session身份认证机制。
- 当前端需要跨域请求后端接口的时候，不推荐使用Session身份认证机制，推荐使用JWT认证机制。
- JWT 是目前最流行的==**跨域认证**==解决方案。



#### 2.5.2 JWT的工作原理

<img src="tu/jwt工作原理.png">

用户的信息通过Token字符串的形式，保存在客户端浏览器中。服务器通过**还原Token字符串的形式**来认证用户的身份。



#### 2.5.3 JWT的组成部分

JWT通常由三部分组成，分别是 **Header** (头部)、**Payload**(有效荷载)、**Signature** (签名)。

三者之间使用 " . " 分隔【仅仅启到分隔的作用】，格式如下：

```
Header.Payload.Signature
```

- Payload部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。
- Header和Signature是安全性相关的部分，只是为了保证Token的安全性。

例子：

```js
eyJhbGci0iJIUzI1NiIsInRScCI6IkpXVCJ9.eyJpZCI6MSwidXNIcmShbwUiOiJhZG1pbiIsInBhc3NBb3JkIjoiIiwibmlja25hbwUiOiLms6X1t7Tlt7QiLCJlbMFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3OOAzNjY4MiwizXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG041lKdZ33S9KBL3XeuBxuI
```



#### 2.5.4 JWT的使用方式

客户端收到服务器返回的WT之后，通常会将它**储存在localStorage 或sessionStorage** 中.

此后，客户端每次与服务器通信，都要带上这个WT的字符串，从而进行身份认证。推荐的做法是**把JWT 放在HTTP请求头的Authorization字段中**，格式如下:

```js
Authorization:BEARER <token>
```



**(1) 安装与配置JWT相关包**

**安装两个JWT相关包**

```
npm i jsonwebtoken express-jwt
```

- jsonwebtoken : **用于生成 JWT 字符串**
- express-jwt : **用于将JWT字符串解析还原成 JSON 对象**



**(2) 定义secret密钥**

为了**保证WT字符串的安全性**，防止WT字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的secret密钥:

- 当生成WT字符串的时候，需要使用secret密钥对用户的信息==**进行加密**==，最终得到加密好的WT字符串
- 当把JWT字符串解析还原成JSON对象的时候，需要使用secret密钥==**进行解密**==

```js
const secreKey='guojuxia';
```



**(3)  在登录成功后生成JWT字符串**

调用jsonwebtoken包提供的 ==**sign() **==方法，将用户的信息加密成WT字符串，响应给客户端:

```js
// 登录接口
app.post('/api/login', function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败！',
    })
  }
  // 登录成功
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期,可以带时间单位
  // 记住：千万不要把密码加密到 token 字符中
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr, // 要发送给客户端的 token 字符串
  })
})
```



**(4) 将JWT字符串还原为JSON对象**

客户端每次在访问那些有权限接口的时候，都需要主动通过**请求头中的Authorization字段**，将Token字符串发送到服务器进行身份认证。
此时，服务器可以通过 **express-jwt **这个中间件，自动将客户端发送过来的Token解析还原成JSON对象:

```js
//expressJWT( { secret: secretKey }）就是用来解析 Token的中间件
//.unless({ path:[/^\/api1//] }）用来指定哪些接口不需要访问权限
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
```



**(5) 使用req.user 获取用户信息**

当express-jwt这个中间件配置成功之后，即可在那些有权限的接口中，使用**req.user**对象，来访问从WT字符串中解析出来的用户信息了，示例代码如下:

```js
// 这是一个有权限的 API 接口
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user, // 要发送给客户端的用户信息，新版本使用req.auth
  })
})
```



**(6) 捕获解析JWT失败后产生的错误**

当使用express-jwt解析Token字符串时，如果客户端发送过来的Token字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行。我们可以通过Express 的错误中间件，捕获这个错误并进行相关的处理，示例代码如下:

```js
使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})
```

详见：<a href="./jwt案例">jwt认证案例</a>.



# 四、 一些常用包

## 密码加密：

包名 bcryptjs

调用 `bcrypt.hashSync(明文密码, 随机盐的长度)` 方法，

```js
const bcrypt = require('bcryptjs');

// 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
userinfo.password = bcrypt.hashSync(userinfo.password, 10)
```

