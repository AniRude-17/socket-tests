import { Button } from 'bootstrap'
import React, { useState } from 'react'





export const Tic = () => {

const [boardValues,updateBoard] = useState([Array(9).fill(null)]);



const Square = ({value}) => {
    return (
        <button className='tic-small-sq'>{value}</button>
    )
};
const Clicks = () => {
    console.log('clicked');
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
                    <Square value={boardValues[0]} onClick={Clicks} />
                    <Square value={boardValues[1]}/>
                    <Square value={boardValues[2]}/>
                </div>
                <div className='game-row'>
                    <Square value={boardValues[3]}/>
                    <Square value={boardValues[4]}/>
                    <Square value={boardValues[5]}/>
                </div>
                <div className='game-row'>
                    <Square value={boardValues[6]}/>
                    <Square value={boardValues[7]}/>
                    <Square value={boardValues[8]}/>
                </div>
            </div>
        </div>
    </div>
  )
}
