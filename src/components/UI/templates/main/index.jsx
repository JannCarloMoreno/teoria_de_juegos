import './styles.css'
import Group from '../../../organisms/group'
import Prompt from '../../../molecules/prompt'
import Button from '../../../atoms/button'
import ShapleyTable from '../../../atoms/table'
import { useRef, useState } from 'react'
import {safeParseFloat, calculateAmount, generateBenchs} from '../../../../utils/util'
import { generateShapleyTable, calculateShapleyForSenate } from '../../../../utils/shapleyFunction'

const getInputData = ref => {
    const value = ref.current.value
    let [totalSeats, ...seatsArray]= value.split(',').map((item) => item.trim())
    seatsArray = seatsArray.filter(item => item.includes('.') && item.length >= 3)
    seatsArray = seatsArray.map(bench =>calculateAmount(safeParseFloat(bench),totalSeats) );
    return generateBenchs(seatsArray)
}

const getValues = ref => {
    const value = ref.current.value
    let [totalSeats, ...seatsArray]= value.split(',').map((item) => item.trim())
    seatsArray = seatsArray.filter(item => item.includes('.') && item.length >= 3)
    seatsArray = seatsArray.map(bench =>safeParseFloat(bench),totalSeats);
    return generateBenchs(seatsArray)
}

export default function Main(){
    const [data, setData] = useState(null)
    const [table, setTable] = useState(null)
    const [isShowing, setIsShowing] = useState(false)
    const [values, setValues] = useState(null)
    const promptRef = useRef(null)

    //Cantidad de maquinas requeridas, maximo 100
    const percentageApproval = 0.85

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
                </section>
                <section className='data'>
                    {data && <Group groups={data} values={values} /> }
                    {table && <ShapleyTable data={table}/>}
                </section>
            </section>
        </section>

    )
}