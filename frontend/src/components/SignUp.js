// import React, { Fragment, useState,useEffect } from "react";

// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { signupUser, verifyEmail,resetError } from "../Reducers/userSignupReducer";
// import Loader from "./Loading";
// const Signup = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   // const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   // const [error, setError] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");

//   const { loading, error,userInfo } = useSelector((state) => state.user);
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();

//     dispatch(signupUser({ name, email, password, confirmPassword }));
//     setOtpSent(true);

//     // try {
//     //     const { data } = await axios.post('/api/v1/register', { name, email, password, confirmPassword });
//     //     setOtpSent(true); // OTP has been sent after successful signup
//     //     setMessage(data.message);
//     //     setLoading(false);
//     // } catch (err) {
//     //     setError(err.response?.data?.message || 'Error during signup.');
//     //     setLoading(false);
//     // }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     // setLoading(true);
//     // setError('');
//     setMessage("");

//     dispatch(verifyEmail({ email, otp }));
//     navigate("/");

//     // try {
//     //     const { data } = await axios.post('/api/v1/verify', { email, otp });
//     //     setMessage('Email verified successfully!');
//     //     setLoading(false);
//     //     console.log(data)
//     //     navigate('/')
//     //     // Here you might want to redirect the user or log them in
//     // } catch (err) {
//     //     setError(err.response?.data?.message || 'Error verifying OTP.');
//     //     setLoading(false);
//     // }
//   };
//   useEffect(() => {
//     // If user is logged in, navigate to home
//     if (userInfo) {
//       navigate('/');
//     }
//     // Optional: Reset error message after displaying it
//     if (error) {
//       setTimeout(() => dispatch(resetError()), 5000); // Clears error after 5 seconds
//     }
//   }, [userInfo, error, navigate, dispatch]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="flex justify-center  items-center  px-4">
//           <div className="w-full max-w-md bg-white ">
//             <h2 className="text-2xl font-bold text-center mb-4">Welcome to ShopEase</h2>

//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             {message && <p className="text-green-500 mb-4">{message}</p>}

//             {!otpSent ? (
//               <form onSubmit={handleSignupSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-1" htmlFor="name">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                     required
//                     placeholder="Enter your name"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-1" htmlFor="email">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                     required
//                     placeholder="Enter your email"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     className="block text-gray-700 mb-1"
//                     htmlFor="password"
//                   >
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                     required
//                     placeholder="Enter your password"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     className="block text-gray-700 mb-1"
//                     htmlFor="confirmPassword"
//                   >
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     id="confirmPassword"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                     required
//                     placeholder="Confirm your password"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//                   disabled={loading}
//                 >
//                   {loading ? "Signing Up..." : "Sign Up"}
//                 </button>
//               </form>
//             ) : (
//               <form onSubmit={handleOtpSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-1" htmlFor="otp">
//                     OTP
//                   </label>
//                   <input
//                     type="text"
//                     id="otp"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                     required
//                     placeholder="Enter the OTP sent to your email"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//                   disabled={loading}
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </Fragment>
//   );
// };

// export default Signup;


import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signupUser, verifyEmail, resetError, resendOtp } from "../Reducers/userSignupReducer";
import Loader from "./Loading";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30); // 30-second countdown for resend OTP
  const [canResend, setCanResend] = useState(false); // To enable/disable resend OTP button

  const { loading, error, userInfo,emailVerified } = useSelector((state) => state.user);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous message
    setMessage("");
    
    // Check if passwords match
    if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
    } else {
        dispatch(signupUser({ name, email, password, confirmPassword }));
        setOtpSent(true);
        setTimer(30); // Reset timer on signup
        setCanResend(false); // Disable the resend button
    }
};

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    dispatch(verifyEmail({ email, otp }));
    if(emailVerified){
        navigate("/");
    }
    // navigate("/");
  };

  const handleResendOtp = () => {
    dispatch(resendOtp({ email})); // Resend OTP
    setTimer(30); // Reset the timer for another 30 seconds
    setCanResend(false); // Disable the resend button
};

  // Countdown for resend OTP
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true); // Enable resend button after 30 seconds
    }

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [otpSent, timer]);

  useEffect(() => {
    if(emailVerified){
        navigate("/");
    }

    if (error) {
      setTimeout(() => dispatch(resetError()), 5000);
    }
  }, [userInfo, error,emailVerified, navigate, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center px-4">
          <div className="w-full max-w-md bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">Welcome to ShopEase</h2>
           

            {!otpSent ? (
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1" htmlFor="name">
                    Name
                  </label>
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
                  <label className="block text-gray-700 mb-1" htmlFor="email">
                    Email
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

                <div className="mb-4">
                  <label className="block text-gray-700 mb-1" htmlFor="password">
                    Password
                  </label>
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
                    placeholder="Confirm your password"
                  />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {message && <p className="text-green-500 mb-4">{message}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}

                </button>
                
              </form>
            ) :loading ? (
                <Loader />): (
              <form onSubmit={handleOtpSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1" htmlFor="otp">
                    OTP
                  </label>
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
                {error && <p className="text-red-500 mb-4">{error} Otp does not match</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}

            {otpSent && (
              <div className="mt-4">
                <button
                  className={`w-full bg-gray-500 text-white py-2 rounded-lg transition duration-300 ${canResend ? "hover:bg-blue-500" : "cursor-not-allowed"}`}
                  onClick={handleResendOtp}
                  disabled={!canResend} // Disable button until timer finishes
                >
                  {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Signup;
