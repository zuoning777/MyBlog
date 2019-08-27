var fs = require("fs");
var globalConfig = require("./config");

var fileName = globalConfig.log_path + globalConfig.log_name;


// fs.writeFileSync(fileName, "asdsadf2");
//获取来访IP和留言IP存储至log文件中
function log (request, type) {
    let nowTime = new Date().toLocaleString();
    let getClientIp = function (request) {
        return request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress || '';
    };
     
    // console.log(getClientIp(request));
    let ip = getClientIp(request).match(/\d+.\d+.\d+.\d+/);
    // console.log(ip);
    ip = ip ? ip.join('.') : null;
    // console.log(ip);
    fs.appendFile(fileName, nowTime + '|' + type + '：' + ip + "\n", function () {});//writeFile只是可写，不能追加，即{flag:"w"};appendFile默认可追加，即{flag:"a"}
}

module.exports = log;