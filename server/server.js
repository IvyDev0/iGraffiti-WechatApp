// 引入http模块
var http = require('http');
// 引入多线程
var process = require('child_process');

// 开启服务，监听8888端口
// 端口号最好为6000以上
var server = http.createServer(function(req,res){
    /*
        req用来接受客户端数据
        res用来向客户端发送服务器数据
    */
    // 定义POST变量，暂存请求体的信息
    var post = '';

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){
        post += chunk;
    });

    req.on('end',function(){
        // 解析参数
        post = querystring.parse(post);
        // 响应
        // post.
    });

    var input = "./input/horse.jpg";
    var output = "./output/output.jpg";
    // 在后台创建连接成功显示
    console.log('有客户端连接');
    // 执行处理图像进程（这里可以不用通过.sh文件传参数）
    process.exec("./edges" + " " + input + " " + output);

    // 一参是http请求状态，200连接成功
    // 连接成功后向客户端写入头信息
    res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"'
    });

    res.write(output);//显示给客户端
    res.end();

}).listen(8888);

console.log('服务器开启成功');