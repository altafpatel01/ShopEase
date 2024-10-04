import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../Reducers/authForgotPassword';   // Action from Redux Toolkit
import Loader from '../components/Loading'; // Optional loader component
import Swal from 'sweetalert2'; // Optional SweetAlert for success/error messages

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.forgotPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword( {email} ));
  };

  if (success) {
    Swal.fire({
      icon: 'success',
      title: 'Password reset link sent!',
      text: 'Please check your email to reset your password.',
    });
  }

  return (
    <div className="flex justify-center items-center overflow-hidden mt-56 max-h-56">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
                placeholder="Enter your email"
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
