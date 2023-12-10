import React from 'react';
import './App.css';
import { Chat } from './pages/Chat';
import { Errors } from './pages/Errors';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



function App() {
  return (
    <Router>
      <div>
        <nav>
          The Socket Test
        </nav>
      </div>

      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/error" element={<div><Errors/></div>} />
      </Routes>
      <div className='button-list'>
        <Link to="/chat"><button>Chat</button></Link>
        <Link to="/error"><button>Errors</button></Link>
      </div>
    </Router>
  );
}

export default App;
