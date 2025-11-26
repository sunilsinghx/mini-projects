import Square from "./Square"


const style={
  borderRadius:"10px",
  width:"350px",
  height:"350px",
  margin:"0 auto",
  display:"grid",
  gridTemplate: "repeat(3,1fr)/repeat(3,1fr)",
  boxShadow:"#3c8be0 5px 5px 3px 0px"
}

const Board = ({squares,handleClick}) => {
  return (
    <div style={style} className="box">
      {
        squares.map((sq,index)=>(
          <Square 
            key={index}
            value={sq}
            onClick={()=>handleClick(index)}
          
          />
        ))
      }
    </div>
  )
}

export default Board