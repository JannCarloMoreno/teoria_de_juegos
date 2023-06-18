import './styles.css'

export default function Input ({type='text', placeholder='', name='', onChange=null}){
    return (
        onChange?<input type={type} name={name} placeholder={placeholder} onChange={onChange}/>
            :<input type={type}  name={name} placeholder={placeholder}  />
    )
}