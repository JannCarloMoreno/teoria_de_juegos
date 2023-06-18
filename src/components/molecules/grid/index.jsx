import Square from "../../atoms/square"
import './styles.css'
import { useState } from "react"

export default function Grid({color, amount}){
    const [isHover, setIsHover] = useState(false)
    
    const handleMouseEnter = () => setIsHover(true)

    const handleMouseLeave = () => setIsHover(false)

    const gridStyle = (color) => {
        if (isHover)
            return {boxShadow: `0px 0px 20px 2px ${color}`}
        return null
    }
    return (
        <div className="grid" 
            style={gridStyle(color)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
        {
            Array(amount)
            .fill(0)
            .map((_,index) => 
                    <Square  color={color} key={index}/>)
        }  
        </div>

                
    )
}
