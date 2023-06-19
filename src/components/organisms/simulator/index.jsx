import "./styles.css";
import { useEffect, useState } from "react";

export default function Simulator({ sendData , startSimulation}) {
  
  const [valoresCompanias, setValoresCompanias] = useState([]); //array de int
  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [numCompanies, setNumCompanies] = useState(0);
  const [lambda, setLambda] = useState(0);
  const [costoTotal, setCostoTotal] = useState();
  const [totalServs,setTotalServs] = useState(0)
  

  const handleLambda = (event) => {
    setLambda(event.target.value);
  };

  const handleNumCompanies = (event) => {
    setValoresCompanias([])
    setNumCompanies(event.target.value);
  };

  const handleServersPerCompanies = (event, index) => {
    const newValues = [...valoresCompanias];
    newValues[index] = +event.target.value;
    setValoresCompanias(newValues);
  }

  const handlePrecioUnitario = (event) => {
    setPrecioUnitario(event.target.value);
  }

const handleSimulation = () => {
  const simulationData = {
    numServsPorCompania: valoresCompanias,
    precioUnitario: precioUnitario,
    numCompanias: numCompanies,
    lambda: lambda,
    costoMaxTotal: costoTotal,
    totalServs: totalServs,
  };
  
  sendData(simulationData);
  startSimulation(true);
}


  const labelCompanies = Array.from({ length: numCompanies }, (_, index) => (
    <label className="simulator__config--labelHor" key={index}>
      Compañía {index + 1}:
      <input type="text" onChange={(event) => handleServersPerCompanies(event, index)}/>
      {}
    </label>
  ));



  const contractedCompanies = Array.from({ length: valoresCompanias.length }, (_, index) => {

    let aux = valoresCompanias[index]*precioUnitario

    return (
    <tr key={index}>
      <td className="company">Compañía {index + 1}</td>
      <td className="servers">{valoresCompanias[index]} servidores</td>
      <td className="price"> {aux.toFixed(2)} $</td>
    </tr>
  )
});

  useEffect(() => {
    const totalCost = valoresCompanias.reduce(
      (acc, currentValue) => acc + currentValue * precioUnitario,
      0
    );
    setCostoTotal(totalCost);
  }, [valoresCompanias, precioUnitario]);


  useEffect(() => {
    const aux = valoresCompanias.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
    
    setTotalServs(aux);
  }, [valoresCompanias]);

  return (
    <div className="simulator">
      <section className="simulator__config">
        <h3>Establece los parametros de configuración</h3>
        <section>
          <label htmlFor="" className="simulator__config--labelVer">
          <span><b>(λ)</b> tasa media de ocupación por hora</span> 
            <input type="number" onChange={handleLambda} />
          </label>
          <label htmlFor="" className="simulator__config--labelVer">
          <span><b>($)</b> precio unitario de servidor activo por hora</span> 
            <input type="number" onChange={handlePrecioUnitario} />
          </label>
          <label htmlFor="" className="simulator__config--labelVer">
            
            <span><b>(N)</b> Numero de proveedores</span> 
            <input
              type="number"
              min={0}
              value={numCompanies}
              onChange={handleNumCompanies}
            />
          </label>
        </section>
        <section className="simulator__config__companies">
          
          <label htmlFor="" className="simulator__config__companies">
            
          <h3>Número de servidores contratados por proveedor</h3>
           
          </label>
          {numCompanies != 0 && (
            <>
              <section className="simulator__config__companies__titles">
                <p>Lista de Proveedores</p>
                <p>Servidores</p>
              </section>
              {labelCompanies}
            </>
          )}
        </section>
      </section>

      <section className="simulator__config top">

      <label htmlFor="" className="simulator__config--labelVer">
            
            <h3>Resumen de la simulación</h3>
           </label>

        <section>
          <label htmlFor="" className="simulator__config--labelVer">
          <span><b>(λ)  {lambda} </b> | tasa media de ocupación por hora</span> 
            
          </label>
          <label htmlFor="" className="simulator__config--labelVer">
            
            <span><b>(N)  {numCompanies}</b> | Número de proveedores</span> 
           <span>Precio unitario por servidor activo: <b style={{color: "darkgreen"}}>{precioUnitario}$ </b>por hora</span> 
          </label>
        </section>
        <section className="simulator__config__companies">
          
          <label htmlFor="" className="simulator__config--labelVer">
            
           <h3>Lista de contratación</h3>
           
          </label>
          {numCompanies != 0 && (
               <table className="table">
                <thead>
                  <tr>
                    <th>Proveedor</th>
                    <th>Servidores contratados</th>
                    <th>Costo máximo*</th>
                  </tr>
                </thead>
                <tbody>
                  {contractedCompanies}
                </tbody>
              </table>
          )}

            <label htmlFor="" className="simulator__config--labelVer">
            
            <span>*El costo maximo solo se aplicará solo en caso de que la ocupación total contratada sea requerida</span> 
            
           </label>

           <label htmlFor="" className="simulator__config--labelVer">
            
            <h4 style={{textAlign: "right"}}>Costo maximo total <b style={{color: "darkgreen"}}>{costoTotal?.toFixed(2)}$ </b>por hora</h4> 
            <h4 style={{textAlign: "right"}}>Total servidores contratados <b style={{color: "blue"}}>{totalServs}</b></h4> 
            

           </label>

          <button className="init_sim" style={{borderRadius: "10px", paddingBottom: "30px"}} onClick={handleSimulation} >Iniciar Simulación</button>
          

        </section>
      </section>

    </div>
  );
}
