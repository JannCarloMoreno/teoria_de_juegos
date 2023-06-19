import React, { useEffect, useState } from "react";
import "./styles.css";
import ProgressBar from "../progressbar";
import Main from "../../UI/templates/main";
import Button from "../../atoms/button";
import funcionPercentilExpon from "../../../utils/percentilExpon";
import Timer from "../timer";

const Sincronizacion = ({ data, getPlay }) => {
  const valorDeHora = 60; // Cambiado el valor para que 10 segundos de vida real sean 3600 segundos en el código
  const [percentageApproval, setPercentageApproval] = useState(0);
  const [this_data, setThis_Data] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("Continuar");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (getPlay) {
      setIsActive(false);
      setThis_Data(data);
      play();
    }
  }, [getPlay]);

  useEffect(() => {
    if (isActive) {
      play();
    }
  }, [isActive]);

  const play = () => {
    if (!isActive) {
      setPercentageApproval(funcionPercentilExpon(data?.lambda));
      setText("Espere...");
      setIsActive(true);
    } else {
      const id = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 1;
          // paso computacional reloj

          if (newCounter % valorDeHora === 0) {
            clearInterval(id); // Pausar la simulación
            setText("Continuar");
            setIsActive(false);
          }
          return newCounter;
        });
      }, 100); // Cambiado el intervalo de tiempo a 100 ms para que la simulación sea más fluida
      setIntervalId(id);
    }
  };

  useEffect(() => {
    setPercentageApproval(funcionPercentilExpon(data?.lambda));
  }, [data?.lambda]);

  const handleButtonClick = () => {
    if (isActive) {
      return; // No hacer nada si isActive es true
    }
    play();
  };

  return (
    <>
      <section>
        <ProgressBar totalTime={valorDeHora} active={isActive} />
        <label htmlFor="">Tiempo de simulación: {Math.floor(counter )} min</label>
        <br />
        <Button
          onClick={handleButtonClick}
          text={text}
          disabled={isActive}
          className={isActive ? "disabled-button" : ""}
        />
      </section>

      <Main getPercentageApproval={percentageApproval} getData={this_data} />
    </>
  );
};

export default Sincronizacion;
