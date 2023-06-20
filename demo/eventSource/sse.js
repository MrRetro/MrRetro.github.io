/**
 * @author caijianjia
 * @date 2023-06-16 00:28
 */
const fs = require('fs')
const express = require('express') // npm install express
const app = express()

// 监听EventSource-test路由服务端返回事件流
app.get('/EventSource-test', (ewq, res) => {
    // 根据 EventSource 规范设置报头
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*", // 允许跨域
        "Content-Type": "text/event-stream", // 规定把报头设置为 text/event-stream
        "Cache-Control": "no-cache" // 设置不对页面进行缓存
    })
    // 用write返回事件流，事件流仅仅是一个简单的文本数据流，每条消息以一个空行(\n)作为分割。
    res.write(':注释' + '\n\n')  // 注释行
    res.write('data:' + '消息内容1' + '\n\n') // 未命名事件

    res.write(  // 命名事件
        'event: myEve' + '\n' +
        'data:' + '消息内容2' + '\n' +
        'retry:' + '2000' + '\n' +
        'id:' + '12345' + '\n\n'
    )

    setInterval(() => { // 定时事件
        res.write('data:' + '定时消息' + '\n\n')
    }, 2000)
})

// 监听 6788
app.listen(6788, () => {
    console.log(`server runing on port 6788 ...`)
})
