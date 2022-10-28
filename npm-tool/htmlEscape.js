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


module.exports={
    htmlEscape,
    htmlUnEscape
}