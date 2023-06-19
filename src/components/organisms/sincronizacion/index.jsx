import React from "react";
import "./styles.css";
import { useEffect, useState } from "react";
import ProgressBar from "../progressbar";
import Main from "../../UI/templates/main";
import Button from "../../atoms/button";
import funcionPercentilExpon from "../../../utils/percentilExpon";


const Sincronizacion = ({ data, getPlay}) => {
  const [percentageApproval, setPercentageApproval] = useState(0);
  const [this_data, setThis_Data] = useState({});

  //Generador aleatorio lcGrand
  useEffect(() => {
  setPercentageApproval(funcionPercentilExpon(data?.lambda));
    
  }, [data?.lambda]);

  useEffect(() => {
    if(getPlay){
      setThis_Data(data);
      console.log(this_data)
      setTimeout(() => {
        play()
      }, 2000);
      
    }
  }, [getPlay]);

  const play = () => {
    if (isActive) {
      clearInterval(intervalId);
    } else {
      const id = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 1;
          //paso computacional reloj

          if (newCounter % 10 === 0) {
            clearInterval(id); // Pausar la simulación
            setText("Continuar");
            //al reanudar la simulacion luego de 10 segundos, se actualiza porcentajeAproval por un nuevo valor aleatorio
            setPercentageApproval(funcionPercentilExpon(data?.lambda));
            //volver a calcular todo en el main


          }
          return newCounter;
        });
      }, 1000);
      setIntervalId(id);
    }

    setIsActive(!isActive);
    setText(isActive ? "Continuar" : "Pausar");
  };

  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("Continuar");
  const [intervalId, setIntervalId] = useState(null);

  return (
    <>
      <section>
        <ProgressBar totalTime={10} active={isActive} />
        <label htmlFor="">{counter}</label>
        <br />
        <Button onClick={play} text={text} />
      </section>

      <Main getPercentageApproval={percentageApproval} getData={this_data}/>

    </>
  );
};

export default Sincronizacion;
