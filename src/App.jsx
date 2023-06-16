import React, { useState } from 'react';

function App() {
  const [seatData, setSeatData] = useState([]);

  const handleInputChange = (e) => {
    const inputString = e.target.value;
    const [totalSeats, ...seatsArray]= inputString.split(',').map((item) => item.trim());
    
    const test = seatsArray.filter(item => item.includes('.') && item.length >= 3)
    const [partyOne, partyTwo, partyThree, partyFour] = test;
    const seatsData = {
      totalSeats: parseInt(totalSeats),
        partyOne: parseFloat(Number.isNaN(partyOne)? 0:partyOne),
        partyTwo: parseFloat(Number.isNaN(partyTwo)? 0:partyTwo),
        partyThree: parseFloat(Number.isNaN(partyThree)? 0:partyThree),
        partyFour: parseFloat(Number.isNaN(partyFour)? 0:partyFour),
    }
    // const seatsData = test.map((seat) => {
    //   const [partyOne, partyTwo, partyThree, partyFour] = seat.split(',').map((item) => item.trim());
    //   return {
    //     totalSeats: parseInt(totalSeats),
    //     partyOne: parseFloat(partyOne),
    //     partyTwo: parseFloat(partyTwo),
    //     partyThree: parseFloat(partyThree),
    //     partyFour: parseFloat(partyFour),
    //   };
    // });
    console.log(seatsData)
    setSeatData(seatsData);
  };

  //const squareColor = (value,percentage) => `rgba(${value * 50}, 0, 0, ${percentage / 100})`;

  const squareColor = () => {
    let x = Math.floor(Math.random() * 256)
    let y = Math.floor(Math.random() * 256)
    let z = Math.floor(Math.random() * 256)
    let bgColor = `rgb(${x}, ${y}, ${z})`;
    return bgColor;
  }
  const renderGrid = () => {
    // return seatData.map((party) => {
    //   const squareColor = `rgba(${party.partyNumber * 50}, 0, 0, ${party.seatPercentage / 100})`;
    //   return (
    //     Array(party.totalSeats)
    //       .fill(0)
    //       .map((item, index) =>
    //         <div className = 'counter' key={index} style={{ background: squareColor, width: '20px', height: '20px', margin: '2px', border: '1px solid white' }}>
    //         </div>
    //       ))
    // });
    const seats = [];
    const {totalSeats, ...seatsValues} = seatData;
    let seatsKeys = Object.keys(seatsValues);
    let previousColors = []
    for (let seat of seatsKeys) {
      const amountSeats = Math.round(totalSeats * seatsValues[seat]);
      if (amountSeats === 0 || Number.isNaN(amountSeats)) continue;
      let color = squareColor();
      while(previousColors.includes(color)) {
        color = squareColor();
      };
      seats.push(Array(amountSeats)
      .fill(0)
      .map((item, index) =>
        <div className = 'counter' key={index} style={{ background: color, width: '20px', height: '20px', margin: '2px', border: '1px solid white' }}>
        </div>
      ))
    }
    return seats
  };

  return (
    <div>
      <input type="text" placeholder="Enter seat data" onChange={handleInputChange} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderGrid()}</div>
    </div>
  );
}

export default App;
