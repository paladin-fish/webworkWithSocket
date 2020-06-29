
    // importScripts('https://code.jquery.com/jquery-3.4.1.min.js');
    importScripts("/socket.io/socket.io.js")
    var socket = io();
    let msgList = [];
    let count = 0;
    socket.on('test', (data) => {
        // console.log('data===',data)
        msgList.push(data)
        count ++;
        // console.log('msgList===',msgList.length)
        // $('#messages').append($('<li>').text(JSON.stringify(data)));
    })
    socket.on('chatMessage', (msg) => {
        msgList.push(msg)
        // $('#messages').append($('<li>').text(JSON.stringify(msg)));
    })

    socket.on('end message', (msg) => {
        console.log('##########test end##########')
        console.log('receive: ', count)
        console.log('send: ',msg)
        clearInterval(timer)
        close()
    })
    socket.emit('start test')
    let timer = setInterval(() => {
        const _msgList = msgList.splice(0) || []
        // console.log('_msg===',_msgList)
        postMessage(_msgList);
        // console.log('')
    },300)
