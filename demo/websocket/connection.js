/**
 * @author caijianjia
 * @date 2023-06-14 00:31
 */

/* server.js 服务器 */

// 引入
const WebSocketServer = require('websocket').server
const http = require('http')
const port = 8000
let time = 0

// 创建服务器
const server = http.createServer((request, response) => {
    console.log(`${new Date().toLocaleDateString()} Received request for ${request.url}`)
    response.writeHead(404)
    response.end()
})
server.listen(port, () => {
    console.log(`${new Date().toLocaleDateString()} Server is listening on port ${port}`)
})


// websocket 服务器
const wsServer = new WebSocketServer({
    httpServer: server
})

// 建立连接
wsServer.on('request', (request) => {
    // 当前的连接
    console.log(request.origin, '=======request.origin=======')
    const connection = request.accept(null, request.origin)
    console.log(`${new Date().toLocaleDateString()} 已经建立连接`)

    setInterval(() => {
        const obj = {
            title: '标题' + time++,
            value: '内容' + time++
        }
        connection.send(JSON.stringify(obj))
    }, 2000)

    // 监听客户端发来的的消息
    connection.on('message',  (message) => {
        console.log('message========>', message)
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            // connection.sendUTF(message.utf8Data);
        } else if (message.type === 'binary') {
            // binary 二进制
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            // connection.sendBytes(message.binaryData);
        }
    });

    // 监听当前连接 当断开链接(网页关闭) 触发
    connection.on('close', (reasonCdoe, description) => {
        console.log(`${new Date().toLocaleDateString()} ${connection.remoteAddress} 断开链接`)
    })
})
