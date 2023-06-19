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

    const [numServsPorCompania, setNumServsPorCompania] = useState([]); //array de int
    const [precioUnitario, setPrecioUnitario] = useState(0);
    const [numCompanias, setNumCompanias] = useState(0);
    const [lambda, setLambda] = useState(0);
    const [costoMaxTotal, setCostoMaxTotal] = useState();
    const [playSim, setPlaySim] = useState(false);
    const [totalServs,setTotalServs] = useState(0)

    const recieveData = (data) => {

      setLambda(data?.lambda)
      setNumServsPorCompania(data?.numServsPorCompania)
      setPrecioUnitario(data?.precioUnitario)
      setNumCompanias(data?.numCompanias)
      setCostoMaxTotal(data?.costoMaxTotal)
      setTotalServs(data?.totalServs)
      console.log(data)
    }

    const startSimulation = (play) => {
      if(play){
        console.log("start simulation")
        setPlaySim(true)
        
      }else{
        console.log("stop simulation")
        setPlaySim(false)
      }
    }
    
    return (
        <section className="main">
          <Header />
          <section className="main__title">
            
          </section>
          <Simulator sendData={recieveData} startSimulation={startSimulation}/>
          <Sincronizacion lambda={lambda}/>
        </section>
      );
    }