import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Grid from './Grid'

function App() {
  const seatDataString = '{1:30, 2:20, 3:10, 4:40}';
  const seatData = seatDataString
    .slice(1, -1)
    .split(',')
    .map((party) => {
      const [number, percentage] = party.split(':');
      return {
        number: parseInt(number),
        seats: parseInt(percentage),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      };
    });

  return (
    <div className="App">
      <h1>Parliament Grid</h1>
      <Grid seatData={seatData} />
    </div>
  );
}

export default App
