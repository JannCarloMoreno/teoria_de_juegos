import lcgrand from './lcgrand.js';

export default function funcionPercentilExpon(media) {
    /* Función generadora percentil exponencial */
    /* Retorna una variable aleatoria exponencial con media "media" */
  
    // Crear un U¬(0,1)
    let U = lcgrand(Math.floor(Math.random() * 100));
  
    // Nota: En JavaScript, Math.log() retorna el logaritmo natural (base e)
  
    const aux = Math.floor(-media * Math.log(U)); // Castear aux y redondearlo al entero inferior
  
    // Ajustar el valor de aux para que esté entre 1 y 100
    const percentil = Math.max(1, Math.min(aux, 100));
  
    return (percentil/100);
  }
  
  
