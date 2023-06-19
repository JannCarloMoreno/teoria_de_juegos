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

    const [data, setData] = useState({});
    const [play, setPlay] = useState(false);

    const recieveData = (data) => {
      setData(data)      
    }

    const startSimulation = (play) => {
      if(play){

        console.log("start simulation")

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });

        setPlay(true)
      }
    }
    
    return (
        <section className="main">
          <Header />
          <section className="main__title">
            
          </section>
          <Simulator sendData={recieveData} startSimulation={startSimulation}/>
          <Sincronizacion data={data} getPlay={play}/>
        </section>
      );
    }