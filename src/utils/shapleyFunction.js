import { tableBodyClasses } from "@mui/material";

let this_shapleyTable = {}


const createCoallitions = (benches) => {
    const keys = Object.keys(benches);
    const result = [];
    const f = (prefix = [], keys) => {
        for (let i = 0; i < keys.length; i++) {
            result.push([...prefix, keys[i]]);
            f([...prefix, keys[i]], keys.slice(i + 1));
        }
    };
    f([], keys);
    return result;
}

const coallitionLength = coallition => coallition.length

const coallitionPercentage = ({coallition, benches, totalServers}) => {

  const serversSum = coallition.reduce((acc,current)=> acc+benches[current],0).toFixed(2)

  //porcentaje participación
  return  (serversSum*100/totalServers).toFixed(2)
}



  
const victoryFunction = (value,percentageApproval) => {
//Porcentaje de aprovación !! meter funcion caracteristica

const intValue = value > 2 ? (+value)/100 : +value

//console.log({value,percentageApproval,intValue})

if(intValue >= percentageApproval){
  return 1
}else{
  return 0
}
}


const generateShapleyTable = ({benches, percentageApproval}) => {   
  const coallitions = createCoallitions(benches)
  const shapleyTable = {}
  shapleyTable['none'] = {
    k:0,
    S:0,
    vS:0
  }

  //calcula total servers
  const totalServers = Object.values(benches).reduce((acc, current) => acc + current, 0);
  for (let coallition of coallitions){
    const S = coallitionPercentage({coallition, benches, totalServers})
    shapleyTable[coallition.join('-')] = {
      k: coallitionLength(coallition),
      S,
      vS: victoryFunction(S, percentageApproval)
    }
  }
 
  this_shapleyTable = shapleyTable
  return shapleyTable
}

const getCoallitionWithout = (bench, coallition) =>
   coallition.split('-').length < 2? 
      'none'
      : coallition.split('-').filter(b => b !== bench).join('-')

const factorialize = num => {
  if (num < 0) 
        return -1;
  else if (num == 0) 
      return 1;
  else {
      return (num * factorialize(num - 1));
  }
}

const calculateShapleyFor = (bench, table) => {
  const coallitionsWithBench = Object.keys(table).filter(coallition => coallition.includes(bench))
  const n = Math.sqrt(Object.keys(table).length)
  return coallitionsWithBench.reduce((acc, current) => {
    const coallitionData = table[current]
    const inverseCoallitionData = table[getCoallitionWithout(bench,current)]
    const sumValue = ((factorialize(coallitionData.k-1)*factorialize(n-coallitionData.k))/(factorialize(n)))*(parseFloat(coallitionData.vS)-parseFloat(inverseCoallitionData.vS))
    return acc + sumValue
  },0)
}

const calculateShapleyForSenate = ({benches, percentageApproval}) => {

  /*
  console.log("shapley inputs")
  console.log({benches, percentageApproval})
  */

  const table = generateShapleyTable({benches, percentageApproval})
  
  /*
  console.log("table generated")
  console.log(this_shapleyTable)
  */

  const aux = Object.keys(benches).reduce((acc, current) => {return {...acc, [current]:calculateShapleyFor(current, table)}}, {})
  /*
  console.log("final result")
  console.log(aux)
  */
  
  return aux

}

export  {
  generateShapleyTable,
  calculateShapleyForSenate
}