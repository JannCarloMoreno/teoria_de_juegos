import Square from "../../atoms/square"
import './styles.css'
import { useState } from "react"

export default function Grid({color, amount, name, value, paidValue}){
    const [isHover, setIsHover] = useState(false)
    
    const this_value = (value.toFixed(3)*100).toFixed(1)
    const this_payvalue = (value.toFixed(3)*paidValue).toFixed(2)


    const handleMouseEnter = () => setIsHover(true)

    const handleMouseLeave = () => setIsHover(false)

    const gridStyle = (color) => {
        if (isHover)
            return {boxShadow: `0px 0px 20px 2px ${color}`}
        return null
    }
    return (
        <div className="container">
            <label className='gridLabel' htmlFor="" >{name}</label>
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
            <label htmlFor='' className="gridLabel">Participación: {this_value}%</label>
            <label htmlFor='' className="gridLabel">Valor a pagar: {this_payvalue}$</label>
        </div>

                
    )
}
