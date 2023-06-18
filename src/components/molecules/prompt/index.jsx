import Button from "../../atoms/button";
import Input from "../../atoms/input";
import './styles.css'

export default function Prompt({buttonText='send',handleChange=null , inputPlaceholder =''}){
    return (
        <div className="prompt">
            <Input placeholder={inputPlaceholder} handleChange={handleChange}/>
            <Button text={buttonText}/>
        </div>
    )
}