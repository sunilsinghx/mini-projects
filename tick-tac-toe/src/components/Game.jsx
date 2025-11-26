import { useState } from "react"
import {calculateWinner} from "./common/util"
import Board from "./Board"

const style={

  container:{
    display:"flex",
    flexDirection:"column",
    alignContent:"center",
    justifyContent:"space-evenly",
    height:"100%"
  },
  info:{
    fontSize:"2rem",
    opacity:"0.5",
    textShadow:"5px 5px #424242"
  },
  button:{
    marginTop:"30px"
  }

}

const Game = () => {

  const [board,setBoard]= useState(Array(9).fill(null))
  const [xTurn,setXTurn]=useState(true)
  const winner = calculateWinner(board)


  const handleClick=(i)=>{
    const tempBoard= [...board];
    if(winner || tempBoard[i]) return

    tempBoard[i] = xTurn? "X":"O"
    setBoard(tempBoard)
    setXTurn(turn=> !turn)
  }

  

  return (
    <div style={style.container}>
      <p style={style.info}>
        {winner? "Winner : " + winner: "Next Player: "+(xTurn? "X":"O")}
      </p>
      <Board 
        squares={board} 
        handleClick={handleClick}
      />
       <button 
       style={style.button}
       onClick={() => setBoard(Array(9).fill(null)) }>Reset Game</button>

    </div>
    
  )
}

export default Game