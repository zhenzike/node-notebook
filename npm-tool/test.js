const index=require('./index');

const htmlStr='<h1 title="abc">这是h1标签&nbsp;</h1>'
console.log(index.dateFormat(new Date()));
console.log(index.htmlEscape(htmlStr));
console.log(index.htmlUnEscape('&lt;h1 title=&quot;abc&quot;&gt;这是h1标签&amp;nbsp;&lt;/h1&gt;'));