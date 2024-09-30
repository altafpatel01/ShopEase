import React, { Fragment, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { signupUser, verifyEmail } from '../Reducers/userSignupReducer';
import Loader from './Loading'
const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    // const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const {loading, error} = useSelector((state)=>state.user)
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        

        dispatch(signupUser({name, email, password,confirmPassword}))
        setOtpSent(true)


        // try {
        //     const { data } = await axios.post('/api/v1/register', { name, email, password, confirmPassword });
        //     setOtpSent(true); // OTP has been sent after successful signup
        //     setMessage(data.message);
        //     setLoading(false);
        // } catch (err) {
        //     setError(err.response?.data?.message || 'Error during signup.');
        //     setLoading(false);
        // }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        // setError('');
        setMessage('');

        dispatch(verifyEmail({email,otp}))
        navigate('/')

        // try {
        //     const { data } = await axios.post('/api/v1/verify', { email, otp });
        //     setMessage('Email verified successfully!');
        //     setLoading(false);
        //     console.log(data)
        //     navigate('/')
        //     // Here you might want to redirect the user or log them in
        // } catch (err) {
        //     setError(err.response?.data?.message || 'Error verifying OTP.');
        //     setLoading(false);
        // }
    };

    return (
       <Fragment>
        {loading?<Loader/>: <div className="flex justify-center  items-center min-h-screen  px-4">
            <div className="w-full max-w-md bg-white ">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {message && <p className="text-green-500 mb-4">{message}</p>}

                {!otpSent ? (
                    <form onSubmit={handleSignupSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
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

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="otp">OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                                placeholder="Enter the OTP sent to your email"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                )}
            </div>
        </div>
}
       </Fragment>    );
};

export default Signup;
