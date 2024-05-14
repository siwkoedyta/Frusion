import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPanel.css';
import Wave from '../../../components/wave/Wave.js';
import Logo from '../../../components/logo/Logo.js';
import LogoWithNoName from '../../../components/logo/LogoWithNoName.js';
import Arrow from '../../../components/arrow/Arrow.js';
import { auth } from '../../../api/auth/auth.js';
import { authCurrent } from '../../../api/auth/authCurrent.js';


export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  async function handleSignIn(event) {
    event.preventDefault();
  
    try {
      await auth(email, password);
      const loggedInUser = await authCurrent();
      console.log("Current user:", loggedInUser);
      if(loggedInUser.role === "ADMIN"){
        window.location.href = '/Home';
      } else{
        window.location.href = '/ClientHome';
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className='panels'>
      <Wave/>

      <div id="logoNone">
        <Logo color="#351431"/>
      </div>

      <div id='logoWithNameLoginPanel'>
        <LogoWithNoName/>
        <h1 id='frusionNameLogin'>Frusion</h1>
      </div>

      <div id='inputPanelLog'>

        <div className='middle'>
          <div id='informationPanelLog'>Sign in to your account</div>
          <div className='inputGap'>
            <input 
              className='inputPanels'
              placeholder="Email"
              onChange={event => setEmail(event.target.value)}
            />
            <input 
              className='inputPanels'
              placeholder="Password"
              type="password"
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          {error && <div className="errorMessage">{error}</div>} 
        </div>
        
        <div className='right' id='rightPanelLog'>
          <div className='buttonArrow'>
            <div className='captionButton'>Sign in</div>
            <button className='buttonPanel' onClick={handleSignIn}><Arrow/></button>
          </div>
        </div>

        <div className='middle'>
          <div id='createAccountPanelLog'>
            <div>Don't have an account?</div>
            <Link to="/RegistrationPanel" id='createAccountButtonPanelLog'>Create</Link>
          </div>
        </div>

      </div>

    </div>
  );
}