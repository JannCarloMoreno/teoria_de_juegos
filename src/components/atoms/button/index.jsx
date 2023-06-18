import './styles.css'
export default function Button({text, onClick, className=null}) {
    return (
        <button className={className} onClick={onClick}>{text}</button>
    )
}