import React, { useState, Fragment } from "react";
import Login from "./Login";
import Signup from "./SignUp";

function AuthForm() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [animating, setAnimating] = useState(false); // Add animation state

    const toggleForm = () => {
        setAnimating(true);
        setTimeout(() => {
            setIsLoginForm(!isLoginForm);
            setAnimating(false);
        }, 500); // Animation duration matches the keyframes duration (0.5s)
    };

    return (
        <Fragment>
            <div className="flex justify-center items-center min-h-screen mobile:bg-white  bg-gray-100">
                <div className="w-full max-w-md bg-white p-6 rounded-lg mobile:shadow-none shadow-lg">
                    {/* Toggle buttons */}
                    <div className="flex h-[100%] justify-around mb-6">
                        <button
                            onClick={toggleForm}
                            className={`${
                                isLoginForm ? "bg-blue-500" : "bg-gray-300"
                            } text-white py-2 px-4 rounded-lg shadow-md transform transition-all duration-500 ease-in-out hover:scale-105`}
                        >
                            Login
                        </button>
                        <button
                            onClick={toggleForm}
                            className={`${
                                !isLoginForm ? "bg-blue-500" : "bg-gray-300"
                            } text-white py-2 px-4 rounded-lg shadow-md transform transition-all duration-500 ease-in-out hover:scale-105`}
                        >
                            Signup
                        </button>
                    </div>

                    {/* Transition between login and signup */}
                    <div className="relative h-[450px]">
                        <div
                            className={`transform transition-transform duration-500 ease-in-out ${
                                isLoginForm && !animating
                                    ? "animate-slideIn"
                                    : "animate-slideOut absolute"
                            }`}
                        >
                            {isLoginForm && <Login />}
                        </div>

                        <div
                            className={`transform transition-transform duration-500 ease-in-out ${
                                !isLoginForm && !animating
                                    ? "animate-slideIn"
                                    : "animate-slideOut absolute"
                            }`}
                        >
                            {!isLoginForm && <Signup />}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AuthForm;
