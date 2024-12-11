import React from "react";
import Navbar from "../components/Navbar";
import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router-dom";
import video from "../assets/signin-video.mp4";
import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";



const SignIn = () => {
  const navigate = useNavigate();
  const firebaseConfig = {
    apiKey: "AIzaSyBVmg97HDNoKD2VHDqBQ0BYFj1QlxTiHb8",
    authDomain: "droplet-10b44.firebaseapp.com",
    projectId: "droplet-10b44",
    storageBucket: "droplet-10b44.appspot.com",
    messagingSenderId: "600481809512",
    appId: "1:600481809512:web:24e0a88bc22be02dc567dd",
    measurementId: "G-Q1E2DFHD18"
  };

  // Function to initialize Firebase and return services

  const handleGoogleSignIn = async () => {
    try {
      let app;

      app = initializeApp(firebaseConfig);


      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();


      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await axios.post('http://localhost:5000/auth/signin', { idToken });
      const { customToken } = response.data;

      console.log('Custom Token:', customToken);
      if (response.status === 200) {
        navigate("/dashboard/dishCalculator");
      }
      // Use the custom token for authentication
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };



  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="relative flex items-center justify-center h-[100vh]">
        <div className="w-full max-w-[420px] rounded-xl flex flex-col justify-center items-center px-8 bg-white py-16 z-10">
          <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="\src\assets\droplet-logo.svg"
                  alt="droplet-logo"
                  width={48}
                />
                <p className="text-3xl text-[#2563eb] font-medium">Droplet</p>
              </div>
              <p className="text-center mt-3 text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                Welcome back! Let's continue our journey towards water
                conservation and a sustainable future.
              </p>
            </div>
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <img
                    src="src/assets/google.svg"
                    alt="google-logo"
                    width={20}
                    height={20}
                  />
                  <span>Sign in with Google</span>
                </button>

              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  onClick={handleSignUpClick}
                  className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer transition-colors"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute object-cover w-full h-full inset-0">
          <video
            autoPlay={true}
            loop={true}
            width="100%"
            className="absolute w-full h-full inset-0 object-cover"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
};

export default SignIn;
