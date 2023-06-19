import React from "react";
import "./styles.css";
import { useEffect, useState } from "react";
import ProgressBar from "../progressbar";
import Main from "../../UI/templates/main";
import Button from "../../atoms/button";
import funcionPercentilExpon from "../../../utils/percentilExpon";


const Sincronizacion = ({ lambda }) => {
  const [percentageApproval, setPercentageApproval] = useState(0);


  console.log("lambda", lambda);
  //Generador aleatorio lcGrand
  useEffect(() => {
    setPercentageApproval(funcionPercentilExpon(lambda));
  }, []);

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
            setText("Simular");
            //al reanudar la simulacion luego de 10 segundos, se actualiza porcentajeAproval por un nuevo valor aleatorio
            setPercentageApproval(funcionPercentilExpon(lambda));
          }
          return newCounter;
        });
      }, 1000);
      setIntervalId(id);
    }

    setIsActive(!isActive);
    setText(isActive ? "Simular" : "Pausar");
  };

  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("Simular");
  const [intervalId, setIntervalId] = useState(null);

  return (
    <>
      <section>
        <ProgressBar totalTime={10} active={isActive} />
        <label htmlFor="">{counter}</label>
        <br />
        <Button onClick={play} text={text} />
      </section>
      <Main percentageApproval={percentageApproval} />
    </>
  );
};

export default Sincronizacion;
