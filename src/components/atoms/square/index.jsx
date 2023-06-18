import './styles.css'

export default function Square({color, key}){
    return (
        <div className = 'counter' key={key} style = {{backgroundColor: color}}>
        </div>
    )
}