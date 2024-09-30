
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Reducers/userSignupReducer";
import Loader from "./Loading";

function Login() {
    const dispatch = useDispatch()
    const {Loading,error} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   

    const handleSignin =  (e) => {
        e.preventDefault()
        dispatch(loginUser({email,password}))
        navigate("/")
        // e.preventDefault(); // Prevent form submission
        // try {
        //     const { data } = await axios.post("/api/v1/login", { email, password });
        //     console.log(data);
        //     navigate("/");
        // } catch (error) {
        //     console.log(error);
        //     setError(error.response?.data?.message || "Login failed."); // Set error message
        // }
    };

    // Logic to hide the eyes when the password is not empty
    const hideEyes = password !== '';

    return (
        <Fragment>
           {Loading?<Loader/>: !error ? (
                <div className="w-7xl">
                    <div className="max-w-xl mx-auto px-4 py-20">
                        <form onSubmit={handleSignin}>
                            

                            {/* Monkey face with eye visibility logic */}
                            <div className="relative text-center mb-4">
                                <div className="w-24 h-24 mx-auto bg-yellow-300 rounded-full relative"> {/* Monkey face */}
                                    {/* Monkey eyes */}
                                    {!hideEyes && (
                                        <div className="absolute w-full h-full top-0 left-0 flex justify-around items-center">
                                            <div className="w-4 h-4 bg-black rounded-full"></div> {/* Left eye */}
                                            <div className="w-4 h-4 bg-black rounded-full"></div> {/* Right eye */}
                                        </div>
                                    )}
                                </div>
                            </div>

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
                            
                            <button
                                type="submit"
                                className="bg-blue-700 text-white my-4 inline text-center px-4 py-2 rounded-md"
                            >
                                Sign In
                            </button>
                            <Link to="/forgotPassword" className="underline">
                                <p>Forgot Password?</p>
                            </Link>
                        </form>
                    </div>
                </div>
            ) : (
                <p className="text-red-500 text-center">{error}</p>
            )}
        </Fragment>
    );
}

export default Login;
