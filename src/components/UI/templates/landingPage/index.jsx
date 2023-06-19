import "./styles.css";
import Header from "../../../organisms/header";
import Simulator from "../../../organisms/simulator";
import Main from "../main";
import ProgressBar from "../../../organisms/progressbar";
import Button from "../../../atoms/button";
import { useEffect, useState } from "react";
import funcionPercentilExpon from "../../../../utils/percentilExpon";
import Sincronizacion from "../../../organisms/sincronizacion";

  export default function LandingPage() {
    
    //inputLambda, entrada del usuario, media entre llegadas de % de ocupación requerida por hora del total de maquinas contratadas
    //restrucciones: entre 1 y 100

    const [lambda, setLambda] = useState(0);

    const recieveLambda = (lambda) => {
      setLambda(lambda)
    }
    
    return (
        <section className="main">
          <Header />
          <section className="main__title">
            <h2>Simulador | Utilidad de recursos computacionales</h2>
          </section>
          <Simulator sendlambda={recieveLambda}/>
          <Sincronizacion lambda={lambda}/>
        </section>
      );
    }