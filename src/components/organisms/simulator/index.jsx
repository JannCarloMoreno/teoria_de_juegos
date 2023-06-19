import "./styles.css";
import { useEffect, useState } from "react";

export default function Simulator({ sendlambda}) {

  const [numCompanies, setNumCompanies] = useState(0);

  const handleNumCompanies = (event) => {
    setNumCompanies(event.target.value);
  };

  const labelCompanies = Array.from({ length: numCompanies }, (_, index) => (
    <label className="simulator__config--labelHor" key={index}>
      Compañía {index}:
      <input type="text" />
    </label>
  ));

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
            <input
              type="number"
              min={0}
              value={numCompanies}
              onChange={handleNumCompanies}
            />
          </label>
        </section>
        <section className="simulator__config__companies">
          <h4>Selecciona la cantidad de maquinas a disponer por empresa</h4>
          <section></section>
          {numCompanies != 0 && labelCompanies}
          <button>Calcular</button>
        </section>
      </section>
      <section className="simulator__results">
        <p>Presiona Calcular para ver los resultados</p>
      </section>
    </div>
  );
}
