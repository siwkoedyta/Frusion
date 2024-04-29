import React, { useState } from 'react';
import { addClient } from '../../../api/client/addClient';
import { isValidEmail, isValidPassword, arePasswordsMatch } from '../../../utils/validation';

export default function AddClients({ onUpdate }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] =  useState('');


    const handleInputChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleInputChangeLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleInputChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleInputChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleInputChangeRepeatPassword = (event) => {
        setRepeatPassword(event.target.value);
    };

    const handleAddClient = async (e) => {
        e.preventDefault();

        if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || repeatPassword.trim() === '') {
            setError('Please enter all data.');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(password)) {
            setError(
              <>
              Password: 4 letters, special character, number
              </>
            );
            return;
        }

        if (!arePasswordsMatch(password, repeatPassword)) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await addClient(firstName, lastName, email, password);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setRepeatPassword('');
            setError('');
            onUpdate();
        } catch (errors) {
            setError(errors);
        }
    };

    return (
        <div className='methodPlace'>
            <div>Add client</div>
            <div>
                <div className='inputGap'>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChangeFirstName}
                        placeholder="First name"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChangeLastName}
                        placeholder="Last name"
                    />
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleInputChangeEmail}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChangePassword}
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        name="repeatPassword"
                        value={repeatPassword}
                        onChange={handleInputChangeRepeatPassword}
                        placeholder="Repeat password"
                    />
                </div>
            </div>
            {error && <div className="errorMessageMethod">{error}</div>}
            <button className='buttonMethod' onClick={handleAddClient}>Add</button>
        </div>
    );
}