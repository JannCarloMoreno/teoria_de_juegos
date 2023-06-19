import './styles.css'
import { forwardRef } from 'react'

const Input =  forwardRef(function Input ({type='text', placeholder='', name='', onChange=null, dataParams}, ref){
    return (
        onChange?<input ref={ref} type={type} name={name} placeholder={placeholder} onChange={onChange}/>
            :<input ref={ref} type={type}  value={dataParams} name={name} placeholder={placeholder}  />
    )
})

export default Input