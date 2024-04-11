import './RegistrationPanel.css'
import Wave from '../../../components/wave/Wave.js';
import Arrow from '../../../components/arrow/Arrow.js';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { register } from '../../../api/register.js';


export default function RegistrationPanel() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [frusionName, setFrusionName] = useState("");

    const handleCreate = async (e) => {
        if (email.trim() === '' || password.trim() === '' || repeatPassword.trim() === '' || frusionName.trim() === '') {
            alert('Please enter all data.');
            return;
          }

        if (password !== repeatPassword) {
            alert('Passwords do not match.');
            return;
        }
      
          return register(email, password, frusionName)
            .then(res => {
                setEmail('')
                setPassword('')
                setRepeatPassword('')
                setFrusionName('')               
            })
            .catch(errors => alert(errors))
    }

  return (
    <div className='panels'>
        <Wave/>
        <div id='inputPanelLog'>
            
            <div className='middle'>
                <div id='titlePanelRegistration'>Create account</div>
                <input 
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                />
                <input 
                type="text"
                name="password"
                placeholder="Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                />
                <input 
                type="text"
                name="repeatPassword"
                placeholder="Repeat password"
                value={repeatPassword}
                onChange={event => setRepeatPassword(event.target.value)}
                />
                <input 
                type="text"
                name="frusionName"
                placeholder="Frusion name"
                value={frusionName}
                onChange={event => setFrusionName(event.target.value)}
                />
            </div>

            <div id='buttonsPanelRegistration'>
                <div className='left'>
                    <div className='buttonArrow'>
                        <Link to="/LoginPanel" className='buttonPanel' id='signInButtonPanelRegistration'><Arrow/></Link>
                        <div className='captionButton'>Sign in</div>
                    </div>
                </div>
                
                <div className='right'>
                    <div className='buttonArrow'>
                        <div className='captionButton'>Create</div>
                        <Link to="/LoginPanel" className='buttonPanel' onClick={handleCreate}><Arrow/></Link>
                    </div>
                </div>


            </div>
        </div>
    </div>
  );
}