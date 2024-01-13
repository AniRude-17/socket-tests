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
        
        if(checkWinner())
        {
            if(checkWinner()==='draw')
            {
                alert('Draw');
            }
            else
            {
                alert(checkWinner()+' Won');
            }
            updateBoard([" "," "," "," "," "," "," "," "," "]);
            socket.emit('tic3x3', [" "," "," "," "," "," "," "," "," "]);
        };
        
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
    }

    };

    // PLEASE CHANGE THIS
    // SOO BAD SOO BAD
    // PLEASE CHANGE THIS

    const checkWinner = () => {
        if (boardValues[0] === boardValues[1] && boardValues[1] === boardValues[2] && boardValues[0] !== ' ') {
            return boardValues[0];
        } else if (boardValues[3] === boardValues[4] && boardValues[4] === boardValues[5] && boardValues[3] !== ' ') {
            return boardValues[3];
        } else if (boardValues[6] === boardValues[7] && boardValues[7] === boardValues[8] && boardValues[6] !== ' ') {
            return boardValues[6];
        } else if (boardValues[0] === boardValues[3] && boardValues[3] === boardValues[6] && boardValues[0] !== ' ') {
            return boardValues[0];
        } else if (boardValues[1] === boardValues[4] && boardValues[4] === boardValues[7] && boardValues[1] !== ' ') {
            return boardValues[1];
        } else if (boardValues[2] === boardValues[5] && boardValues[5] === boardValues[8] && boardValues[2] !== ' ') {
            return boardValues[2];
        } else if (boardValues[0] === boardValues[4] && boardValues[4] === boardValues[8] && boardValues[0] !== ' ') {
            return boardValues[0];
        } else if (boardValues[2] === boardValues[4] && boardValues[4] === boardValues[6] && boardValues[2] !== ' ') {
            return boardValues[2];
        } else if (boardValues[0] !== ' ' && boardValues[1] !== ' ' && boardValues[2] !== ' ' && boardValues[3] !== ' ' && boardValues[4] !== ' ' && boardValues[5] !== ' ' && boardValues[6] !== ' ' && boardValues[7] !== ' ' && boardValues[8] !== ' ') {
            return 'draw';
        } else {
            return null;
        }
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
