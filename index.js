var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path')
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/test', (req, res) => {
    console.log('text===',req.body)
    let { name } = req.body;
    res.send({res:1, msg:`${name}, nice to see you!`})
})
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chatMessage', msg); // This will emit the event to all connected sockets
    });

    socket.on('start test', () => {
        let count = 0;
        let timer = setInterval(() => {
            if(count === 10000) {
                clearInterval(timer)
                io.emit('end message',count);
            }
            count++;
            io.emit('test', new Date()); // This will emit the event to all connected sockets
        },30) 
    })
});

http.listen(3001, () => {
    console.log('listening on : 3001');
})
