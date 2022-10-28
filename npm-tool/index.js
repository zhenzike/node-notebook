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


