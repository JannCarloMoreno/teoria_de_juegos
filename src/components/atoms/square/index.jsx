import './styles.css'

export default function Square({color, myKey}){
    return (
        <div className = 'counter' key={myKey} style = {{backgroundColor: color}}>
        </div>
    )
}