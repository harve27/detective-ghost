import React, { useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LogoImage from './assets/Logo.png'; // Import your logo image
import { auth } from './firebase';
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  async function handleLogout() {
    await signOut(auth)
    setUser(null)
  }

  return (
    <Container className='jost-voyance' style={{ minHeight: '100vh', padding: '0px' }}>
      <div className="App" style={{ background: 'linear-gradient(to bottom, #8B0000, #3B0B0B)', minHeight: '100vh', padding: '20px' }}>
        {user ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <img src={LogoImage} alt="Logo" style={{ maxWidth: '200px', height: 'auto' }} />
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Menu
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item href="/profile">Profile</Dropdown.Item> */}
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p style={{'color': 'white'}}>Points: {user.points}</p>
              </div>

            </div>
            <HomePage user={user} />
          </>
        ) : (
          <div style={{color: 'white'}}>
            <img src={LogoImage} alt="Logo" style={{ maxWidth: '200px', height: 'auto', marginBottom: '20px' }} />
            <SignUp setUser={setUser} />
            <br />
            <Login setUser={setUser} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
