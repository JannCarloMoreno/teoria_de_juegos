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

const coallitionPercentage = ({coallition, benches}) => 
        coallition.reduce((acc,current)=> acc+benches[current],0).toFixed(4)

const victoryFunction = (value,percentageApproval) => value >= percentageApproval? 1:0 

const generateShapleyTable = ({benches, percentageApproval}) => {
  const coallitions = createCoallitions(benches)
  const shapleyTable = {}
  shapleyTable['none'] = {
    k:0,
    S:0,
    vS:0
  }
  for (let coallition of coallitions){
    const S = coallitionPercentage(coallition)
    shapleyTable[coallition.join('-')] = {
      k: coallitionLength(coallition),
      S,
      vS: victoryFunction(S, percentageApproval)
    }
  }
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
  const table = generateShapleyTable({benches, percentageApproval})
  return Object.keys(benches).reduce((acc, current) => {return {...acc, [current]:calculateShapleyFor(current, table)}}, {})
}

export default {
  generateShapleyTable,
  calculateShapleyForSenate
}