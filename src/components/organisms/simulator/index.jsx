import { useEffect, useState } from "react";
import "./styles.css";

export default function Simulator({ sendlambda }) {


  const [lambda, setLambda] = useState(0);


const handleLambda = (event) => {
  setLambda(event.target.value)
}

useEffect(() => {
  sendlambda(lambda)
}, [lambda]);

  return (
    <div className="simulator">
      <section className="simulator__config">
        <h3>Descripción del simulador</h3>
        <section>
          <label htmlFor="" className="simulator__config--labelVer">
            tasa de llegada
            <input type="number" onChange={handleLambda}  />
          </label>
          <label htmlFor="" className="simulator__config--labelVer">
            cantidad de empresas
            <input type="text" />
          </label>
        </section>
        <section className="simulator__config__companies">
          <h4>Selecciona la cantidad de maquinas a disponer por empresa</h4>
          <section></section>
          <label htmlFor="" className="simulator__config--labelHor">
            Compañía 1:
            <input type="text" />
          </label>
          <label htmlFor="" className="simulator__config--labelHor">
            Compañía 2:
            <input type="text" />
          </label>
          <label htmlFor="" className="simulator__config--labelHor">
            Compañía n:
            <input type="text" />
          </label>
          <button>Calcular</button>
        </section>
      </section>
      <section className="simulator__results">
        <p>Presiona Calcular para ver los resultados</p>
      </section>
    </div>
  );
}