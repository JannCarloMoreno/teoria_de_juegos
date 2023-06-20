import Square from "../../atoms/square"
import './styles.css'
import { useEffect, useState } from "react"

export default function Grid({color, amount, name, value, paidValue, sendValues}){
    const [isHover, setIsHover] = useState(false)
    
    const aux = value.toFixed(3)*100
    const aux2 = value.toFixed(3)*paidValue


    const [this_value, setValue] = useState(aux.toFixed(1));
    const [this_payvalue, setPayvalue] = useState(aux2.toFixed(2));


    useEffect(() => {
        setValue(aux.toFixed(1));
        setPayvalue(aux2.toFixed(2));
    }, [value]);

    useEffect(() => {
        sendValues(this_value, this_payvalue);
    }, [this_value, this_payvalue]);


    const handleMouseEnter = () => setIsHover(true)

    const handleMouseLeave = () => setIsHover(false)

    const gridStyle = (color) => {
        if (isHover)
            return {boxShadow: `0px 0px 20px 2px ${color}`}
        return null
    }
    return (
        <div className="container">
            <h3  style={{fontWeight: "normal"}} htmlFor="" >Proveedor {name}</h3>
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
            <div style={{display: "flex", marginRight: "12px"}}>
            <label style={{backgroundColor: "#efefef" ,marginLeft: "10px" , borderRadius: "4px"
                    , padding: "0px 5px" , fontSize: "15px" , border: "black 1px solid"
                    }} tmlFor=''  className="gridLabel">Participación  <b style={{color: "darkblue"}}> {this_value}%</b></label>
            
            <label style={{backgroundColor: "#efefef", marginLeft: "10px" , borderRadius: "4px"
                    , padding: "0px 5px"  , fontSize: "15px" , border: "black 1px solid" , textAlign: "right"
                    }} htmlFor='' className="gridLabel">Valor a pagar <b style={{color: "darkgreen"}}>{this_payvalue}$ </b> </label>
            </div>
        </div>

                
    )
}