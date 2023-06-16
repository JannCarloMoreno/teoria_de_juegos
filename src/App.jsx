import React, { useState } from 'react';

function App() {
  const [seatData, setSeatData] = useState([]);

  const handleInputChange = (e) => {
    const inputString = e.target.value;
    const seatsArray = inputString.split(',').map((item) => item.trim());

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
      return (
        <div key={party.partyNumber} style={{ background: squareColor, width: '100px', height: '100px' }}>
          Party {party.partyNumber}
        </div>
      );
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
