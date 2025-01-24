
import React, { Fragment, useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { loginUser,resetError } from "../Reducers/userSignupReducer";
// import { useLocation } from 'react-router-dom';

import Loader from "./Loading";

function Login() {
    // const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,error,userInfo,isAuthenticated} = useSelector((state)=>state.user)
    // const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   

    const handleSignin =  (e) => {
        e.preventDefault()
        dispatch(loginUser({email,password}))
       
      
    };

    useEffect(() => {
        // If user is logged in, navigate to home
        if (isAuthenticated) {
          navigate('/');
        }
        // Optional: Reset error message after displaying it
        if (error) {
          setTimeout(() => dispatch(resetError()), 5000); // Clears error after 5 seconds
        }
      }, [userInfo, error, navigate, dispatch,isAuthenticated]);

    return (
        <Fragment>
           {loading?<Loader/>: (
                <div className="w-7xl">
                    <div className="max-w-xl mx-auto px-4 py-5">
                    <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
                        <form onSubmit={handleSignin}>
                                           
                           <label className="block text-gray-700 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                                placeholder="Enter your Email"
                            />

                            <label className="block text-gray-700 my-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                                placeholder="Enter your Password"
                            />
                            <p className="text-red-500 text-center">{error}</p>
                            <button
                                type="submit"
                                className="bg-blue-700 text-white my-4 inline text-center px-4 py-2 rounded-md"
                            >
                                Sign In
                            </button>
                            <Link to="/forgot-Password" className="underline">
                                <p>Forgot Password?</p>
                            </Link>
                        </form>
                    </div>
                </div>
            ) }
        </Fragment>
    );
}

export default Login;


