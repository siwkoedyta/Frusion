import './RegistrationPanel.css'
import Wave from '../../../components/wave/Wave.js';
import Arrow from '../../../components/arrow/Arrow.js';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { register } from '../../../api/auth/register.js';
import { isValidEmail, isValidPassword, arePasswordsMatch } from '../../../utils/validation.js';

export default function RegistrationPanel() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [frusionName, setFrusionName] = useState("");
    const [error, setError] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();

        if (email.trim() === '' || repeatPassword.trim() === '' || frusionName.trim() === '') {
            setError('Please enter all data.');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
    
        if (!isValidPassword(password)) {
            setError('Password must contain:\n- at least 4 letters,\n- a special character, and\n- a number.');
            return;
        }
    
        if (!arePasswordsMatch(password, repeatPassword)) {
            setError('Passwords do not match.');
            return;
        }
    
        try {
            await register(email, password, frusionName);
            window.location.href = '/LoginPanel';
            setEmail('');
            setPassword('');
            setRepeatPassword('');
            setFrusionName('');
    
        } catch (errors) {
            setError(errors);
        }
    }

    return (
        <div className='panels'>
            <Wave/>
            <div id='inputPanelLog'>
                <div className='middle'>
                    <div id='titlePanelRegistration'>Create account</div>
                    <div className='inputGap'>
                        <input 
                            className='inputPanels'
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <input 
                            className='inputPanels'
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <input 
                            className='inputPanels'
                            type="password"
                            name="repeatPassword"
                            placeholder="Repeat password"
                            value={repeatPassword}
                            onChange={event => setRepeatPassword(event.target.value)}
                        />
                        <input 
                            className='inputPanels'
                            type="text"
                            name="frusionName"
                            placeholder="Frusion name"
                            value={frusionName}
                            onChange={event => setFrusionName(event.target.value)}
                        />
                    </div>
                    {error && <div className="errorMessage">{error}</div>}
                </div>

                <div id='buttonsPanelRegistration'>
                    <div className='leftRegistration'>
                        <div className='buttonArrow'>
                            <Link to="/LoginPanel" className='buttonPanel' id='signInButtonPanelRegistration'><Arrow/></Link>
                            <div className='captionButton'>Sign in</div>
                        </div>
                    </div>

                    <div className='rightRegistration'>
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