import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPanel.css';
import Wave from '../../../components/wave/Wave.js';
import Logo from '../../../components/logo/Logo.js';
import Arrow from '../../../components/arrow/Arrow.js';
import { auth } from '../../../api/auth.js';

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(event) {
    auth(email, password)
  }

  return (
    <div className='panels'>
      <Wave/>
      <Logo color="#351431" />
      <div id='inputPanelLog'>
        <div className='middle'>
          <div id='informationPanelLog'>Sign in to your account</div>
          <input 
          placeholder="Email"
          onChange={event => setEmail(event.target.value)}
          />
          <input placeholder="Password"
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div className='right' id='rightPanelLog'>
          <div className='buttonArrow'>
            <div className='captionButton'>Sign in</div>
            <Link to="/Home" className='buttonPanel' onClick={handleSignIn}><Arrow/></Link>
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