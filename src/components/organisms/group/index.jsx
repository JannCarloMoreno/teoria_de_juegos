import Grid from '../../molecules/grid';
import { colorGenerator } from '../../../utils/util';
import './styles.css';
import { useState, useEffect, useCallback } from 'react';

export default function Group({ groups, values, paidValue, sendPartialValues }) {
  const [concateString, setConcateString] = useState('');
  const [wordArray, setWordArray] = useState([]);
  const [objectArray, setObjectArray] = useState([]);

  useEffect(() => {
    const words = concateString.trim().split(' ');
    const firstFourWords = words.slice(0, 8);
    setWordArray(firstFourWords);
  }, [concateString]);

  useEffect(() => {

    const myObjects = [];

    for (let i = 0; i < ((wordArray.length)); i++) {
        const element = {partialPercentaje: wordArray[i], partialPayment: wordArray[i+1]}
        i++
        
        myObjects.push(element);
    }

    setObjectArray(myObjects);

  }, [wordArray]);

  useEffect(() => {
    sendPartialValues(objectArray);
  }, [objectArray]);

  const handleValues = useCallback((partialPercentaje, partialPayment) => {
    const newValue = `${partialPercentaje} ${partialPayment} `;
    setConcateString(prevValue => prevValue + newValue);
  }, []);

  return (
    <div className='group'>{
      Object.keys(groups).map((group) => {
        return (
          <Grid sendValues={handleValues} paidValue={paidValue} value={values[group]} name={group} key={group} color={colorGenerator()} amount={groups[group]} />
        )
      })
    }
    </div>
  )
}
