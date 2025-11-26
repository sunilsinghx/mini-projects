import React from 'react'

const style={
  background:"#e73d9f",
  border:"2px solid #4935ff",
  fontSize:"2em",
  fontWeight:"800",
  cursor:"pointer",
  outline:"none"
}


const Square = ({value,onClick}) => {
  return (
    <button onClick={onClick} style={style}>
      {value}
    </button>
  
  )
}

export default Square