import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const {user}= useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      setIsLoading(true);
      const requestData = {
        email: user.email,
        user_id: user.id,
        newPassword: newPassword
      };

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${user.token}`
        },
        body: JSON.stringify(requestData)
      };
      
      fetch("http://localhost:4000/api/user/forgotpassword", requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
          toast.success("Password reset succesfful")
          window.location.href = '/';
        })

    } catch (error) {
      setError('Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
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
