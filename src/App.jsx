import React, { useState } from 'react';

function App() {
  const [seatData, setSeatData] = useState([]);

  const handleInputChange = (e) => {
    const inputString = e.target.value;
    const seatsArray = inputString.split(',').map((item) => item.trim()).filter(item => item.includes(':'));
    console.log(seatsArray)

    const seatsData = seatsArray.map((seat) => {
      const [partyNumber, seatPercentage] = seat.split(':').map((item) => item.trim());
      return {
        partyNumber: parseInt(partyNumber),
        seatPercentage: parseFloat(seatPercentage),
      };
    });

    setSeatData(seatsData);
  };

  const renderGrid = () => {
    return seatData.map((party) => {
      const squareColor = `rgba(${party.partyNumber * 50}, 0, 0, ${party.seatPercentage / 100})`;
      console.log(party.partyNumber)
      return (
        Array(party.partyNumber)
          .fill(0)
          .map((item, index) =>
            <div key={index} style={{ background: squareColor, width: '20px', height: '20px', margin: '2px', border: '1px solid white' }}>
            </div>
          ))
    });
  };

  return (
    <div>
      <input type="text" placeholder="Enter seat data" onChange={handleInputChange} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderGrid()}</div>
    </div>
  );
}

export default App;
