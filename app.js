const express = require('express');
const socket = require('socket.io');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use('/public', express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', function(socket){
  socket.on('chat', function(data){
    io.emit('message', data);

  });
});

server.listen(port);
