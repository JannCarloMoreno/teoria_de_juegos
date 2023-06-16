import React from 'react';
import { Container, Row, Col } from 'react-grid-system';

const Grid = ({ seatData }) => {
  const totalSeats = seatData.reduce((total, party) => total + party.seats, 0);

  const renderSquares = () => {
    return seatData.map((party) => {
      const { number, seats, color } = party;
      const percentage = (seats / totalSeats) * 100;
      const style = {
        backgroundColor: color,
        width: `${percentage}%`,
      };
      return (
        <Col key={number}>
          <div className="square" style={style}></div>
        </Col>
      );
    });
  };

  return (
    <Container>
      <Row>{renderSquares()}</Row>
    </Container>
  );
};

export default Grid;
