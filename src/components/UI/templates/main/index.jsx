import Group from '../../../organisms/group'
import Prompt from '../../../molecules/prompt'
import Button from '../../../atoms/button'
import ShapleyTable from '../../../atoms/table'
import { useEffect, useRef, useState } from 'react'
import { safeParseFloat, calculateAmount, generateBenchs } from '../../../../utils/util'
import { generateShapleyTable, calculateShapleyForSenate } from '../../../../utils/shapleyFunction'

let this_totalSeats = 0

const getInputData = ref => {
  const value = ref.current.value
  let [totalSeats, ...seatsArray] = value.split(',').map((item) => item.trim())
  seatsArray = seatsArray.filter(item => item.includes('.') && item.length >= 3)
  seatsArray = seatsArray.map(bench => calculateAmount(safeParseFloat(bench), totalSeats))
  this_totalSeats = totalSeats
  return generateBenchs(seatsArray)
}

const getValues = ref => {
  const value = ref.current.value
  let [totalSeats, ...seatsArray] = value.split(',').map((item) => item.trim())
  seatsArray = seatsArray.filter(item => item.includes('.') && item.length >= 3)
  seatsArray = seatsArray.map(bench => safeParseFloat(bench), totalSeats)
  this_totalSeats = totalSeats
  return generateBenchs(seatsArray)
}

export default function Main({ getPercentageApproval, getData }) {
  const [percentageApproval, setPercentageApproval] = useState(0.5)
  const [data, setData] = useState(null)
  const [values, setValues] = useState(null)

  const [dataBuilder, setDataBuilder] = useState({})

  const [prompt, setPrompt] = useState("")

  const promptRef = useRef(null)

  useEffect(() => {
    setPercentageApproval(getPercentageApproval)
  }, [getPercentageApproval])

  useEffect(() => {
    if (getData?.totalServs > 0) {
      const totalServs = getData?.totalServs
      const contribPercentaje = []

      getData?.numServsPorCompania?.map((element) => {
        const C_i = (element * 100) / totalServs
        contribPercentaje.push((C_i / 100).toFixed(2))
      })

      const contrib = contribPercentaje.reduce((acc, elemento) => {
        return acc + ',' + elemento
      })

      const result = totalServs + "," + contrib
      console.log(result)
      setPrompt(result)
    }
  }, [getData])

  const generateTable = () => {
    const incomingTable = generateShapleyTable({ benches: data, percentageApproval: percentageApproval })
    return incomingTable
  }

  useEffect(() => {
    const incomingData = getInputData(promptRef)
    const val = getValues(promptRef)
    setValues(calculateShapleyForSenate({ benches: val, percentageApproval: percentageApproval }))
    setData(incomingData)
  }, [percentageApproval])

  return (
    <section className='main'>
      <section className='senate'>
        <section className='prompt'>
          <label className='totalSeats'>Total MV contratadas: {this_totalSeats}</label>
          <label className='totalSeats'>% de ocupación requerido: {percentageApproval ? percentageApproval : ""}</label>
        </section>
        <section className='data'>
          {data && <Group groups={data} values={values} paidValue={(this_totalSeats * percentageApproval)} />}
          {data && <ShapleyTable data={generateTable()} />}
        </section>
      </section>
      <div style={{visibility: "hidden"}}>
          <Prompt ref={promptRef} buttonText='Generate' handleChange={generateTable} inputPlaceholder='set configuration' dataParams={prompt} />
            </div>
    </section>
  )
}
