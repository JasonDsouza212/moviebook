import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-hot-toast';
import { handleSubmit } from '../apicalls/putcalls';

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const {user}= useAuthContext()

  function handleSubmitfun(e){
    handleSubmit(e,user,currentPassword,newPassword,confirmPassword,setError,setIsLoading)
  }

  return (
    <form className="login" onSubmit={handleSubmitfun}>
      <h3>Reset Password</h3>
      <label>Current Password:</label>
      <input
        type="password"
        onChange={(e) => setCurrentPassword(e.target.value)}
        value={currentPassword}
      />
      <label>New Password:</label>
      <input
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
      />
      <label>Confirm New Password:</label>
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />

      <button type="submit" disabled={isLoading}>
        Reset Password
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ResetPassword;
