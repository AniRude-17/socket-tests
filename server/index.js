const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').createServer(app); // Use createServer method
const cors = require('cors');
app.use(cors());

const io = require('socket.io')(http, {
    cors: {
        origin: ["http://localhost:5173","http://10.250.3.164:5173"]
    }
});

io.on('connection', (socket) => {
    console.log(`yaaaaaaa CONNECTED : ${socket.id} user just connected!`);

    // Listen for incoming messages
    socket.on('message', (data) => {
        console.log(`Message Received: ${data}`);
        io.emit('message', data);
    });


    socket.on('alert', ()=>{
      console.log('ALERT EVERYONE');
      io.emit('alert');
    })
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`DISCONNECT :(  ${socket.id} user disconnected`);
    });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
