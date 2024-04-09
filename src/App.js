import React, { useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LogoImage from './assets/placeholder_logo.jpg'; // Import your logo image
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  async function handleLogout() {
    await signOut(auth)
    setUser(null)
  }

  return (
    <Container style={{ minHeight: '100vh', padding: '0px' }}>
      <div className="App" style={{ background: 'linear-gradient(to bottom, #ff7f7f, #ff3333)', minHeight: '100vh', padding: '20px' }}>
        {user ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <img src={LogoImage} alt="Logo" style={{ maxWidth: '200px', height: 'auto' }} />
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {/* <Dropdown.Item href="/profile">Profile</Dropdown.Item> */}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <HomePage user={user} />
          </>
        ) : (
          <>
            <img src={LogoImage} alt="Logo" style={{ maxWidth: '200px', height: 'auto' }} />
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
