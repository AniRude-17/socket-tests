import { Button } from 'bootstrap'
import React, { useState } from 'react'





export const Tic = () => {

    const [boardValues,updateBoard] = useState([" "," "," "," "," "," "," "," "," "]);
    const Square = ({value,onSqClick}) => {
        return (
            <button className='tic-small-sq' onClick={onSqClick}>{value}</button>
        )
    };


    const Clicks = (index) => {
        return () => {
        console.log('ahah',index);
        console.log('boardValues',boardValues);
        var prevBoard = [...boardValues];
        prevBoard[index] = 'X';
        updateBoard(prevBoard);
        };
    };

    return (
        <div className='TicTaeToe3x3'>
            <h1>Tic Tae Toe</h1>
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
