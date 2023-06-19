import Button from "../../atoms/button";
import Input from "../../atoms/input";
import { forwardRef } from "react";
import './styles.css'

const Prompt = forwardRef(function Prompt({buttonText='send',handleChange=null , inputPlaceholder ='', dataParams}, ref){
    return (
        //100,0.3,0.2,0.15,0.35
        <div className="prompt">
            <Input ref={ref} placeholder={inputPlaceholder} dataParams={dataParams}/>
            <Button text={buttonText} onClick={handleChange}/>
        </div>
    )
})

export default Prompt