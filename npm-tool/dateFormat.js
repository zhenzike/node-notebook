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



module.exports={
    dateFormat
}