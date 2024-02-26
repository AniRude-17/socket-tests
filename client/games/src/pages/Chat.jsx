import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Chat = ({ socket }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  const uselessButton = () => {
    console.log('ALERTED ALL');
    socket.emit('alert');
  }

  const gotoGame = () =>{
    navigate('/tic')
  }

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleIncomingMessage = (incomingMessage) => {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    };

    const handleAlert = () => {
      alert('Someone has alerted you!');
    };

    socket.on('alert',handleAlert);
    socket.on('message', handleIncomingMessage);
    return () => {
      socket.off('message', handleIncomingMessage);
    };
  }, [socket]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
  
    if (message.trim() && localStorage.getItem('userName')) {
      const newMessage = {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      };
  
      socket.emit('message', newMessage, (acknowledgment) => {
        setMessages((prevMessages) => [...prevMessages, acknowledgment]);
      });
    }
  
    setMessage('');
  };

  return (

<div className="chat">
  <header className="chat__mainHeader">
    <p>Global Chat</p>
    <button className="leaveChat__btn" onClick={handleLeaveChat}>
      LEAVE CHAT
    </button>
  </header>

  <div className="message__container">
    {messages.map((message) => (
      <div
        className={`message__chats ${
          message.name === localStorage.getItem('userName')
            ? 'message__sender'
            : 'message__recipient'
        }`}
        key={message.id}
      >
        {message.name !== localStorage.getItem('userName') && (
          <p className="sender__name">{message.name}</p>
        )}
        <div className="message__content">
          <p>{message.text}</p>
        </div>
      </div>
    ))}
  </div>

  <div className="chat__footer">
    <form className="form" onSubmit={handleSendMessage}>
      <input
        type="text"
        className="message__input"
        placeholder="Write message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="sendBtn">SEND</button>
    </form>
    <button className='temp' onClick={uselessButton}>Alert Everyone</button>
    <button className='button' onClick={gotoGame}>Tic Tae Toe</button>
  </div>
</div>

  );
};
