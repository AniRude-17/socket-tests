const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').createServer(app); // Use createServer method
const cors = require('cors');
app.use(cors());

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on('connection', (socket) => {
    console.log(`yaaaaaaa CONNECTED : ${socket.id} user just connected!`);

    // Listen for incoming messages
    socket.on('message', (data) => {
        // Broadcast the message to all connected clients
        console.log(`Message Received: ${data}`);
        io.emit('message', data);
    });

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
