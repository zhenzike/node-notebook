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

