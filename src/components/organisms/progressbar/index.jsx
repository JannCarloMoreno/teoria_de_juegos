import React, { useEffect, useState } from 'react';

const ProgressBar = ({ totalTime, active }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = null;

    if (active) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress === 100) {
            clearInterval(interval);
            setProgress(0); // Reinicia el progreso al llegar al 100%
            return prevProgress;
          }

          if (prevProgress === 90) {
            setProgress(100); // Establece el progreso en 100% después de 9 segundos
            return prevProgress;
          }

          return prevProgress + (100 / (6 * 10)); // Calcula el incremento basado en totalTime
        });
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [active]);

  useEffect(() => {
    if (!active) {
      setProgress(0); // Reinicia el progreso cuando se desactiva
    }
  }, [active]);

  return (
    <div style={{ width: '200px', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
      <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#4caf50' }} />
    </div>
  );
};

export default ProgressBar;
