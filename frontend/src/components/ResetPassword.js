import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../Reducers/authForgotPassword'; // Adjust the import according to your file structure
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.forgotPassword); // Adjust the state according to your reducer
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const token = useParams(); // Assuming the token is passed in the URL

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: 'Success!',
        text: 'Your password has been reset successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }

    if (error) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }, [success, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Passwords do not match!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    dispatch(resetPassword({token, password,confirmPassword})); // Pass the token and new password to the action
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
              placeholder="Confirm your new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
