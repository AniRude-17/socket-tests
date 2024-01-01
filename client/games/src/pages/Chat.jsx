import React from 'react'

export const Chat = () => {
  return (
    <div className='chat'>
        <div className='chat-messages'>
            The Standard Chat 
        </div>
        <div className='chat-input'>
            <input type='text' />
            <button>Send</button>
        </div>
    </div>
  )
}
