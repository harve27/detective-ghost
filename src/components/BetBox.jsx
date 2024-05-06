import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { db } from '../firebase';
import { doc, updateDoc, setDoc, increment, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import Chart from './Chart';

const BetBox = ({ id, question, endDate, user, yesNumber, noNumber }) => {
  const [betPlaced, setBetPlaced] = useState(false);

  const handleYesClick = async () => {
    try {
      const betRef = doc(db, "betBox", id);

      // Update bet documents
      await updateDoc(betRef, {
        yes: increment(1)
      });

      // Add individual document in bets collection
      await setDoc(doc(db, "users", user.uid, "bets", id), {
        id,
        position: 1, // Position of 1 corresponds to Yes
        timestamp: serverTimestamp(),
        uid: user.uid
      });
      
      setBetPlaced(true);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleNoClick = async () => {
    try {
      const betRef = doc(db, "betBox", id);

      // Update bet document
      await updateDoc(betRef, {
        no: increment(1)
      });

      // Add individual document in bets collection
      await setDoc(doc(db, "users", user.uid, "bets", id), {
        id,
        position: 0, // Position of 0 corresponds to No
        timestamp: serverTimestamp(),
        uid: user.uid
      });

      setBetPlaced(true);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Check if current bet has already been placed
  useEffect(() => {
    
    const checkBetPlaced = async () => {
      try {
        const q = query(collection(db, "users", user.uid, "bets"), where("id", "==", id))
        const querySnapshot = await getDocs(q)
        setBetPlaced(querySnapshot.docs.length > 0)
      } catch (err) {
        console.error('Error fetching user bets:', err);
      }
    }

    checkBetPlaced()
    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="bet-box" style={{ backgroundColor: 'white', border: '2px solid black', padding: '20px', borderRadius: '10px', boxShadow: '0 12px 12px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
      <Row>
        <Col xs={6}>
          <div style={{ textAlign: 'left' }}>
            <h2>{question}</h2>
            <p>Bet ends: {endDate.toDate().toDateString()}</p>
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
            <>
              <p>Bet has been placed!</p>
              <Chart yesNumber={yesNumber} noNumber={noNumber}/>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BetBox;
