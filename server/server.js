var http = require('http');//引入http模块
var process = require('child_process');//引入多线程

//开启服务，监听8888端口
//端口号最好为6000以上
var server = http.createServer(function(req,res){
    /*
        req用来接受客户端数据
        res用来向客户端发送服务器数据
    */
    var input = "./horse.jpg";
    var output = "./output.jpg";
    // 在后台创建连接成功显示
    console.log('有客户端连接');
    // 执行处理图像进程
    process.exec("./edge.sh" + " " + input + " " + output);

    // 一参是http请求状态，200连接成功
    // 连接成功后向客户端写入头信息
    res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"'
    });

    res.write(output);//显示给客户端
    res.end();

}).listen(8888);

console.log('服务器开启成功');