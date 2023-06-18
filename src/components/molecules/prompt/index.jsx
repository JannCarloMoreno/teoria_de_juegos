import Button from "../../atoms/button";
import Input from "../../atoms/input";
import { forwardRef } from "react";
import './styles.css'

const Prompt = forwardRef(function Prompt({buttonText='send',handleChange=null , inputPlaceholder =''}, ref){
    return (
        <div className="prompt">
            <Input ref={ref} placeholder={inputPlaceholder}/>
            <Button text={buttonText} onClick={handleChange}/>
        </div>
    )
})

export default Prompt