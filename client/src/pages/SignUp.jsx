import React from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/signin-video.mp4";
import dropletLogo from "../assets/droplet-logo.svg";
import googleLogo from "../assets/google.svg";
import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVmg97HDNoKD2VHDqBQ0BYFj1QlxTiHb8",
  authDomain: "droplet-10b44.firebaseapp.com",
  projectId: "droplet-10b44",
  storageBucket: "droplet-10b44.appspot.com",
  messagingSenderId: "600481809512",
  appId: "1:600481809512:web:24e0a88bc22be02dc567dd",
  measurementId: "G-Q1E2DFHD18"
};

const SignUp = () => {
  const navigate = useNavigate();
 
  const handleGoogleSignUp = async () => {
    try {
      let app;
      app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post('http://140.245.22.129:3000/auth/signin', { idToken });
      const { customToken } = response.data;
      console.log('Custom Token:', customToken);
      if (response.status === 200) {
        navigate("/dashboard/dishCalculator");
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <>
      <div className="relative flex items-center justify-center min-h-screen w-full px-4 py-8">
        <div className="w-full max-w-[420px] rounded-xl flex flex-col justify-center items-center px-4 sm:px-8 bg-white py-8 sm:py-16 z-10">
          <div className="w-full max-w-md space-y-4 sm:space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={dropletLogo}
                  alt="droplet-logo"
                  className="w-8 sm:w-12"
                />
                <p className="text-2xl sm:text-3xl text-[#2563eb] font-medium">Droplet</p>
              </div>
              <p className="text-center mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto px-2">
                Join us in building a sustainable future. Track, conserve, and
                sustain water - every drop counts.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <button 
                  onClick={handleGoogleSignUp} 
                  className="w-full flex items-center justify-center space-x-3 py-2.5 sm:py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={googleLogo}
                    alt="google-logo"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <span>Sign up with Google</span>
                </button>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  onClick={handleSignInClick}
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  Sign in
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

export default SignUp;