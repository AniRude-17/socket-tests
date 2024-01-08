import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'



export const Tic = ({socket}) => {
    const [lastMove,updateLastMove] = useState('O');
    const [boardValues,updateBoard] = useState([" "," "," "," "," "," "," "," "," "]);
    const [onlineUsers,updateOnlineUsers] = useState([0]);

    const Square = ({value,onSqClick}) => {
        return (
            <button className='tic-small-sq' onClick={onSqClick}>{value}</button>
        )
    };

    useEffect(() => {
        const boardUpdate = (board) => {
          updateBoard([...board]);
        };

        const updateOnline = (online) => {
            console.log('online',online);
            updateOnlineUsers(online);
        }
      
        socket.on('tic3x3', boardUpdate);
        socket.on('online',updateOnline);
        return () => {
          socket.off('tic3x3', boardUpdate);
        };
      }, [socket]);
      
    const Clicks = (index) => {
        return () => {
        console.log('ahah',index);
        console.log('boardValues',boardValues);
        var prevBoard = [...boardValues];

        if(prevBoard[index]!=' ')
        {
            alert("Already Taken");
            return;
        }

        if(lastMove==='O') {
            prevBoard[index] = 'X';
            updateLastMove('X');
            console.log('lastMove',lastMove,"why");
        }
        else {
            prevBoard[index] = 'O';
            updateLastMove('O');
        }

        updateBoard(prevBoard);
        socket.emit('tic3x3', prevBoard);
        };
    };

    return (
        <div className='TicTaeToe3x3'>
            <h1>Tic Tae Toe</h1>
            <h2> Online Currently : { onlineUsers }</h2>
            <div className='game'>
                <div className='current-player'>
                    Player ABC
                </div>
                <div className='game-board'>
                    <div className='game-row'>
                        <Square value={boardValues[0]} onSqClick={Clicks(0)} />
                        <Square value={boardValues[1]} onSqClick={Clicks(1)}/>
                        <Square value={boardValues[2]} onSqClick={Clicks(2)}/>
                    </div>
                    <div className='game-row'>
                        <Square value={boardValues[3]} onSqClick={Clicks(3)}/>
                        <Square value={boardValues[4]} onSqClick={Clicks(4)}/>
                        <Square value={boardValues[5]} onSqClick={Clicks(5)}/>
                    </div>
                    <div className='game-row'>
                        <Square value={boardValues[6]} onSqClick={Clicks(6)}/>
                        <Square value={boardValues[7]} onSqClick={Clicks(7)}/>
                        <Square value={boardValues[8]} onSqClick={Clicks(8)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
