import "./styles.css";
import Group from "../../../organisms/group";
import Prompt from "../../../molecules/prompt";
import Button from "../../../atoms/button";
import ShapleyTable from "../../../atoms/table";
import { useEffect, useRef, useState } from "react";
import {
  safeParseFloat,
  calculateAmount,
  generateBenchs,
} from "../../../../utils/util";
import {
  generateShapleyTable,
  calculateShapleyForSenate,
} from "../../../../utils/shapleyFunction";

let this_totalSeats = 0;

const getInputData = (ref) => {
  const value = ref.current.value;
  let [totalSeats, ...seatsArray] = value.split(",").map((item) => item.trim());
  seatsArray = seatsArray.filter(
    (item) => item.includes(".") && item.length >= 3
  );
  seatsArray = seatsArray.map((bench) =>
    calculateAmount(safeParseFloat(bench), totalSeats)
  );
  this_totalSeats = totalSeats;
  return generateBenchs(seatsArray);
};

const getValues = (ref) => {
  const value = ref.current.value;
  let [totalSeats, ...seatsArray] = value.split(",").map((item) => item.trim());
  seatsArray = seatsArray.filter(
    (item) => item.includes(".") && item.length >= 3
  );
  seatsArray = seatsArray.map((bench) => safeParseFloat(bench), totalSeats);
  this_totalSeats = totalSeats;
  return generateBenchs(seatsArray);
};

export default function Main({ getPercentageApproval, getData }) {
  const [percentageApproval, setPercentageApproval] = useState(0.5);
  const [data, setData] = useState(null);
  const [values, setValues] = useState(null);

  const [prompt, setPrompt] = useState("");

  const [accCost, setAccCost] = useState(0);
  const [accPercentaje, setAccPercentaje] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ]);
  const [accNumber, setAccNumber] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ]);

  const [utilityArray, setUtilityArray] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ]);

  const promptRef = useRef(null);

  useEffect(() => {
    setPercentageApproval(getPercentageApproval);
  }, [getPercentageApproval]);

  useEffect(() => {
    if (getData?.totalServs > 0) {
      const totalServs = getData?.totalServs;
      const contribPercentaje = [];

      getData?.numServsPorCompania?.map((element) => {
        const C_i = (element * 100) / totalServs;
        contribPercentaje.push((C_i / 100).toFixed(2));
      });

      const contrib = contribPercentaje.reduce((acc, elemento) => {
        return acc + "," + elemento;
      });

      const result = totalServs + "," + contrib;
      console.log(result);
      setPrompt(result);
    }
  }, [getData]);

  const generateTable = () => {
    const incomingTable = generateShapleyTable({
      benches: data,
      percentageApproval: percentageApproval,
    });
    return incomingTable;
  };

  useEffect(() => {
    const incomingData = getInputData(promptRef);
    const val = getValues(promptRef);
    setValues(
      calculateShapleyForSenate({
        benches: val,
        percentageApproval: percentageApproval,
      })
    );
    setData(incomingData);
  }, [percentageApproval]);

  const handlePartialValues = (partialValues) => {
    console.log("partial values", partialValues);
    if (partialValues.length > 1) {
      //1 actualizar acumulador de Valor total a pagar: 0 $
      //guardad utilidad por empresa
      const auxUtilityArray = utilityArray;

      partialValues.map((element, index) => {
        const aux = parseFloat(element.partialPayment);

        auxUtilityArray[index] = auxUtilityArray[index] + aux;
      });

      setUtilityArray([...auxUtilityArray]);

      const costSum = partialValues.reduce((sum, element) => {
        const partialPayment = parseFloat(element.partialPayment);
        return sum + parseFloat(partialPayment);
      }, 0);
      setAccCost(accCost + costSum);

      //2 actualizar acumulador de participacion acumulada
      const auxArray = accNumber;

      partialValues.map((element, index) => {
        const aux = parseFloat(element.partialPercentaje);

        auxArray[index] = auxArray[index] + aux;
      });

      //console.log("auxArray",auxArray)

      const valuesSum = auxArray.reduce((sum, element) => {
        return sum + element;
      }, 0);

      const finalPercentajeArray = [];

      auxArray.map((element, index) => {
        const finalPercentaje = (element * 100) / valuesSum;
        
        finalPercentajeArray.push(finalPercentaje);
        //console.log("finalpercentage",finalPercentaje)
      });

      setAccNumber([...auxArray]);
      //setAccPercentaje
      setAccPercentaje([...finalPercentajeArray]);
    }
  };

  return (
    <section className="main">
      <section className="senate">
        {getData?.numServsPorCompania && (
          <section className="performance">
            <section className="">
              
             <table className="performance__table">

            <thead>
              <tr>
                <th style={{color: "#fbffff" ,padding: "3px 20px" , fontWeight: "normal"}}>Máquinas contratadas</th>
                <th style={{color: "#fbffff" ,padding: "3px 20px" , fontWeight: "normal"}}>Ocupación requerida</th>
                <th style={{color: "#fbffff" ,padding: "3px 20px" , fontWeight: "normal"}}>Costo total acumulado</th>
              </tr>
            </thead>


            <tbody>
                  <tr>
                    <td>
                    {this_totalSeats}
                    </td>
                    <td style={{textAlign: "left"}}>
                    <b style={{color: "darkred"}}>
                      {percentageApproval
                        ? (percentageApproval * 100).toFixed(0)
                        : ""}%
                      </b>
                      <br />
                      {Math.ceil(this_totalSeats*percentageApproval) + " Máquinas"}
                    </td>

                    <td>
                    {accCost.toFixed(2)} $
                    </td>

                  </tr>
                
            </tbody>
            </table>

            </section>
            <table className="performance__table">
              <thead>
                <tr>
                  <th style={{color: "#fbffff" ,fontWeight: "normal"}}>Participación acumulada</th>
                  <th style={{color: "#fbffff" ,fontWeight: "normal"}}>Costos acumulados</th>
                </tr>
              </thead>
              <tbody>
                {getData?.numServsPorCompania &&
                  getData?.numServsPorCompania.map((element, index) => (
                    <tr key={index}>
                      <td>
                        {" "}
                        Compañía {index + 1} |  <b style={{color: "darkblue"}} >{accPercentaje[index].toFixed(2)}{" "}
                        %</b>
                      </td>
                      <td style={{color: "darkgreen", fontWeight: "bold"}} > {utilityArray[index].toFixed(2)} $</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        )}
        {getData?.numServsPorCompania && (
          <section className="data">
            {data && (
              <Group
                sendPartialValues={handlePartialValues}
                groups={data}
                values={values}
                paidValue={
                  getData !== {}
                    ? this_totalSeats *
                      percentageApproval *
                      getData?.precioUnitario
                    : 0
                }
              />
            )}
            {data && <ShapleyTable data={generateTable()} />}
          </section>
        )}
      </section>
      <div style={{ visibility: "hidden" }}>
        <Prompt
          ref={promptRef}
          buttonText="Generate"
          handleChange={generateTable}
          inputPlaceholder="set configuration"
          dataParams={prompt}
        />
      </div>
    </section>
  );
}
