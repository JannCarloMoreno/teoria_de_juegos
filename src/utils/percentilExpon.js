import lcgrand from './lcgrand.js';

export default function funcionPercentilExpon(media) {
    /* Función generadora percentil exponencial */
    /* Retorna una variable aleatoria exponencial con media "media" */

    // Crear un U¬(0,1)
    let U = lcgrand(Math.floor(Math.random() * 100)); // Elige un índice aleatorio para zrng

    // Nota: En JavaScript, Math.log() retorna el logaritmo natural (base e)
    return -media * Math.log(U);
}
