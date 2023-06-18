import './styles.css'
import Group from '../../../organisms/group'
import Prompt from '../../../molecules/prompt'
import Button from '../../../atoms/button'
import ShapleyTable from '../../../atoms/table'
import { useEffect, useRef, useState } from 'react'
import {safeParseFloat, calculateAmount, generateBenchs} from '../../../../utils/util'
import { generateShapleyTable, calculateShapleyForSenate } from '../../../../utils/shapleyFunction'

import funcionPercentilExpon from '../../../../utils/percentilExpon'


let this_totalSeats = 0


const getInputData = ref => {
    const value = ref.current.value
    let [totalSeats, ...seatsArray]= value.split(',').map((item) => item.trim())
    seatsArray = seatsArray.filter(item => item.includes('.') && item.length >= 3)
    seatsArray = seatsArray.map(bench =>calculateAmount(safeParseFloat(bench),totalSeats) );
    this_totalSeats = totalSeats
    return generateBenchs(seatsArray)
}

const getValues = ref => {
    const value = ref.current.value
    let [totalSeats, ...seatsArray]= value.split(',').map((item) => item.trim())
    seatsArray = seatsArray.filter(item => item.includes('.') && item.length >= 3)
    seatsArray = seatsArray.map(bench =>safeParseFloat(bench),(totalSeats));
    this_totalSeats = totalSeats
    return generateBenchs(seatsArray)
}

const refresh = () => {
    window.location.reload(false);
}

export default function Main(){
    const [totalSeats, setTotalSeats] = useState(0)
    const [data, setData] = useState(null)
    const [table, setTable] = useState(null)
    const [isShowing, setIsShowing] = useState(false)
    const [values, setValues] = useState(null)

    const [percentageApproval, setPercentageApproval] = useState(0)
    
    const promptRef = useRef(null)

    //inputLambda, entrada del usuario, media entre llegadas de % de ocupación requerida por hora del total de maquinas contratadas
    //restrucciones: entre 1 y 100
    const lambda = 50

    //% de ocupación requerida por hora del total de maquinas contratadas
    //GENERADOR ALEATORIO LCGRAND

    useEffect(() => {
        setPercentageApproval(funcionPercentilExpon(lambda))
    }, []);
    



    console.log(percentageApproval)

    let tableButtonText = `${isShowing?'Show':'Hide'} table`
    
    const handleClick = () => {
        const incomingData = getInputData(promptRef)
        const val = getValues(promptRef)
        if(JSON.stringify(incomingData)!== JSON.stringify(data)) {

            //calculate caracterisic function
            setValues(calculateShapleyForSenate({benches:getValues(promptRef), percentageApproval: percentageApproval}))  
            setData(incomingData)
        }
    }

    
    const generateTable = () => {
        const incomingTable = generateShapleyTable({benches: data, percentageApproval: percentageApproval})
            if(isShowing){
                setTable(incomingTable)
                setIsShowing(false)
            }else{
                setTable(null)
                setIsShowing(true)
            }
    }

    return (
        <section className='main'>
            <section className='senate'>
                <section className='prompt'>
                    <Prompt ref={promptRef} buttonText='Generate' handleChange={handleClick} inputPlaceholder='set configuration' />
                    {data && <Button className='showButton' onClick={generateTable} text={tableButtonText}/>}
                    <Button onClick={refresh} text="refresh"/>
                    <label className='totalSeats'>Total MV contratadas: {this_totalSeats}</label>
                    <label className='totalSeats'>% de ocupación requerido: {percentageApproval}</label>
                </section>
                <section className='data'>
                    {data && <Group groups={data} values={values} paidValue={(this_totalSeats*percentageApproval)} /> }
                    {table && <ShapleyTable data={table}/>}
                </section>
            </section>
        </section>

    )
}