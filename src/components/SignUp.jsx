// SignUp.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userSnapshot = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully!');
      console.log(userSnapshot)
      setUser(userSnapshot.user)
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

        <Button variant="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
