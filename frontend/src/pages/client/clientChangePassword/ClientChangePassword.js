import React, { useState } from 'react';
import { changePasswordClient } from '../../../api/client/changePasswordClient';

export default function ClientChangePassword({ userId }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !repeatNewPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword !== repeatNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      await changePasswordClient(userId, currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setRepeatNewPassword('');
      setError('');
    } catch (error) {
      setError('Invalid current password.');
    }
  };


  return (
    <div className='page pageMiddle'>
      <div className='mainContentInside' id='mainContentFruitBoxes'>
        <div>
            <div className='methodPlace'>
                <div className='titleMethod'>Change password</div>
                <div className='inputGap'>
                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Repeat new password"
                    value={repeatNewPassword}
                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                  />
                </div>
                {error && <div className="errorMessageMethod">{error}</div>}
                {success && <div className="succesMessageMethod">Password changed successfully.</div>}
                <button className='buttonMethod' onClick={handleChangePassword}>Change</button>
            </div>
        </div>
      </div>
    </div>
  );
}