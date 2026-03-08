import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Footer from '../components/Footer';
import Cloud3 from '../assets/images/cloud3.png';
import Navbar from '../components/Navbar';
import { loginSuccess } from "../store/authSlice";
import authService from '../store/authService';
import Boy2 from '../assets/images/boy2.png';
import Girl from '../assets/images/girl.png';

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const data = await authService.login(userData);

      if (data) {
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        navigate("/form"); // Redirect after login
      } else {
        alert("Login failed! Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };
  

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, email, password };
      const data = await authService.signup(userData);

      if (data) {
        alert("Signup successful! Please login.");
        setIsSignUp(false); // Switch to login form
      } else {
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className='overflow-hidden relative'>
      <div className="flex justify-center items-center min-h-screen h-[60vh] relative w-[100vw] bg-white">
        <div className='absolute top-0 w-full'>
          <Navbar />
        </div>


        {isSignUp ? (
          <motion.img
            key="boy"
            className='absolute left-[10%] w-[15vw]'
            src={Boy2}
            alt="boy"
            initial={{ x: "300%" }}
            animate={{ x: 0 }}
            exit={{ x: "50%" }}
            transition={{ delay: 0.001, duration: 0.8, ease: "easeOut" }}
          />
        ) : (
          <motion.img
            key="girl"
            className='absolute top-[22%] right-[14%] w-[11vw]'
            src={Girl}
            alt="girl"
            initial={{ x: "-200%" }}
            animate={{ x: 0 }}
            exit={{ x: "-50%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}


        <div className={`relative w-[768px] max-w-full min-h-[480px] bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-700 ${isSignUp ? 'right-panel-active' : ''}`}>

          {/* Sign Up Form */}
          <div className={`absolute top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-full opacity-100 z-10' : 'translate-x-0 opacity-0 z-0'}`}>
            <form className="bg-white flex flex-col items-center justify-center p-10 h-full text-center" onSubmit={handleSignup}>
              <h1 className="font-bold text-4xl">Create Account</h1>
              <div className="flex space-x-2 my-4">
                <a href="#" className="border p-2 rounded-full"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="border p-2 rounded-full"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="border p-2 rounded-full"><i className="fab fa-linkedin-in"></i></a>
              </div>


              <input
                type="text"
                placeholder="Name"
                className="bg-gray-200 rounded-xl p-2 my-2 w-full"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-200 rounded-xl p-2 my-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="bg-gray-200 rounded-xl p-2 my-2 w-full"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />

              <select
                className="bg-gray-200 rounded-xl p-2 my-2 w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>


              <input
                type="password"
                placeholder="Password"
                className="bg-gray-200 rounded-xl p-2 my-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="mt-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white px-6 py-2 rounded-full">
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className={`absolute top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-full opacity-0 z-0' : 'translate-x-0 opacity-100 z-10'}`}>
            <form className="bg-white flex flex-col items-center justify-center p-10 h-full text-center" onSubmit={handleLogin}>
              <h1 className="font-bold text-4xl">Sign in</h1>
              <div className="flex space-x-2 my-4">
                <a href="#" className="border p-2 rounded-full"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="border p-2 rounded-full"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="border p-2 rounded-full"><i className="fab fa-linkedin-in"></i></a>
              </div>

              <span className="text-sm">Use your email and password</span>
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-200 p-2 rounded-xl my-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-200 rounded-xl p-2 my-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#" className="text-blue-500 text-sm my-2">Forgot your password?</a>

              <button type="submit" className="mt-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white px-6 py-2 rounded-full">
                Sign In
              </button>
            </form>
          </div>

          {/* Overlay */}
          <div className={`absolute top-0 w-1/2 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white flex flex-col items-center justify-center text-center p-10 transition-all duration-700 ease-in-out ${isSignUp ? 'translate-x-0' : 'translate-x-full'}`}>
            {isSignUp ? (
              <>
                <h1 className="text-4xl font-bold">Welcome Back!</h1>
                <p className="text-md pt-3">To keep connected with us, please log in with your personal info.</p>
                <button onClick={() => setIsSignUp(false)} className="mt-4 border border-white hover:bg-white hover:text-blue-500 px-6 py-2 rounded-full">
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold">Hello, Friend!</h1>
                <p className="text-md pt-3">Enter your personal details and start your journey with us.</p>
                <button onClick={() => setIsSignUp(true)} className="mt-4 border border-white hover:bg-white hover:text-blue-500 px-6 py-2 rounded-full">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='h-[40vh] w-full relative'>
        <img className='h-[100%] w-full' src={Cloud3} alt="Cloud" />
      </div>

      <div className='h-[48vh] relative w-full'>
        <Footer />
        <div className='bg-black pb-10 text-white flex justify-center items-center text-center'>
          Copyright &copy; 2024 Career Guidance Pvt. Ltd. <br />
          All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
