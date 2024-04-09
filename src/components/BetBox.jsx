import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { db } from '../firebase';
import { doc, updateDoc, increment } from "firebase/firestore";

const BetBox = ({ id, question, timeLimit }) => {
  const [betPlaced, setBetPlaced] = useState(false);

  const handleYesClick = async () => {
    try {
      const betRef = doc(db, "betBox", id);
      await updateDoc(betRef, {
        yes: increment(1)
      });
      setBetPlaced(true);
    } catch (error  ) {
      console.error("Error updating document:", error);
    }
  };

  const handleNoClick = async () => {
    try {
      const betRef = doc(db, "betBox", id);
      await updateDoc(betRef, {
        no: increment(1)
      });
      setBetPlaced(true);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <Container className="bet-box" style={{ backgroundColor: 'white', border: '2px solid black', padding: '20px', borderRadius: '10px', boxShadow: '0 12px 12px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
      <Row>
        <Col xs={6}>
          <div style={{ textAlign: 'left' }}>
            <h2>{question}</h2>
            <p>Bet ends: {timeLimit}</p>
          </div>
        </Col>
        <Col xs={6}>
          {!betPlaced ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="success" size="lg" onClick={handleYesClick} style={{ backgroundColor: 'transparent', border: '2px solid black', color: 'black', padding: '10px', width: '45%' }}>
                Yes
              </Button>
              <Button variant="danger" size="lg" onClick={handleNoClick} style={{ backgroundColor: 'transparent', border: '2px solid black', color: 'black', padding: '10px', width: '45%' }}>
                No
              </Button>
            </div>
          ) : (
            <p>Bet has been placed!</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BetBox;
