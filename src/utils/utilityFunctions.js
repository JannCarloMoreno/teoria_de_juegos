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

const benches = {b1: 0.3, b2:0.2, b3: 0.35, b4:0.4}

const coallitionLength = coallition => coallition.length
const coallitionPercentage = coallition => 
        coallition.reduce((acc,current)=> acc+benches[current],0).toFixed(4)
const victoryFunction = value => value >= 0.5? 1:0 

const generateShapleyTable = ({benches, percentageApproval}) => {
  coallitions = createCoallitions(benches)
  const shapleyTable = {}
  shapleyTable['none'] = {
    k:0,
    S:0,
    vS:0
  }
  for (coallition of coallitions){
    const S = coallitionPercentage(coallition)
    shapleyTable[coallition.join('-')] = {
      k: coallitionLength(coallition),
      S,
      vS: victoryFunction(S)
    }
  }
  return shapleyTable
}

const table  = generateShapleyTable({benches, percentageApproval: 5})
const getCoallitionWithout = (bench, coallition) => {
  if(coallition.length < 2) return 'none'
  
}


const calculateShapleyFor = (bench, table) => {
  const coallitionsWithBench = Object.keys(table).filter(coallition => coallition.includes(bench))
  
  return coallitionsWithBench
}

//calculateShapleyFor('b1', table)