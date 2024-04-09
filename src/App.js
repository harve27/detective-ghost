import React, { useState } from 'react'
import { Container, Dropdown } from 'react-bootstrap';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp'
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  function handleLogout() {
    
  }

  return (
    <Container style={{ minHeight: '100vh', padding: '20px' }}>
      <div className="App" style={{ background: 'linear-gradient(to bottom, #ff7f7f, #ff3333)', minHeight: '100vh', padding: '20px' }}>
        {user ? <>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <HomePage />
        </> : (
          <>
            <SignUp setUser={setUser} />
            <br />
            <Login setUser={setUser} />
          </>
        )}
      </div>
    </Container>

  );
}

export default App;
