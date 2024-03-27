import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { db } from '../firebase';
import { doc, updateDoc, increment } from "firebase/firestore/lite";

const BetBox = ({ id, question, timeLimit }) => {
  const [betPlaced, setBetPlaced] = useState(false);

  const handleYesClick = async () => {
    try {
      const betRef = doc(db, "betBox", id);
      await updateDoc(betRef, {
        yes: increment(1)
      });
      setBetPlaced(true);
    } catch (error) {
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
    <Container className="bet-box" style={{ backgroundColor: '#cce5ff', border: '2px solid #007bff', padding: '20px', borderRadius: '10px' }}>
      <Row>
        <Col xs={12}>
          <h2 style={{ textAlign: 'left' }}>{question}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p style={{ textAlign: 'left' }}>Bet ends: {timeLimit}</p>
        </Col>
      </Row>
      {!betPlaced ? (
        <>
          <Row>
            <Col xs={12} style={{ textAlign: 'right' }}>
              <Button variant="success" size="lg" onClick={handleYesClick} block>
                Yes
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} style={{ textAlign: 'right' }}>
              <Button variant="danger" size="lg" onClick={handleNoClick} block>
                No
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col xs={12}>
            <p>Bet has been placed!</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BetBox;
