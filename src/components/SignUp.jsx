// SignUp.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userSnapshot = await createUserWithEmailAndPassword(auth, email, password);
      setUser({...userSnapshot.user, points: 0})

      // Create new document in Firestore
      await setDoc(doc(db, "users", userSnapshot.user.uid), {
        email: userSnapshot.user.email,
        id: userSnapshot.user.uid,
        signupTime: serverTimestamp(),
        points: 0,
      });

    } catch (error) { 
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container>
      <h2>Sign Up</h2>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <br />
        <Button variant="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
