import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Chat } from './pages/Chat';
import { Errors } from './pages/Errors';
import io from 'socket.io-client';
import { Tic } from './pages/Tic';


// const socket = io.connect('http://localhost:4000/');
const socket = io.connect('http://10.250.3.164:4000/');

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<Chat socket={socket} />}></Route>
          <Route path="/tic" element={<Tic socket={socket} />}></Route>
          <Route path="/error" element={<Errors />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
