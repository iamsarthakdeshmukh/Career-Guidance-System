import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Typewriter } from 'react-simple-typewriter'
import PBoy from '../assets/images/PBoy.png'

function Profile() {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        dob: ''
    });

    const [editing, setEditing] = useState({
        name: false,
        email: false,
        mobile: false,
        gender: false,
        dob: false
    });

    const careerSuggestion = useSelector((state) => state.career.careerSuggestion);
    const student = useSelector((state) => state.career.student);
    const [user, setUser] = useState("")
    const [showLoader, setShowLoader] = useState(true);
    const [showSuggestion, setShowSuggestion] = useState(false);

    useEffect(() => {
        async function userData() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.log("No token found");
                    setShowLoader(false); // Fail gracefully
                    return;
                }
    
                const response = await fetch("http://localhost:5002/api/users/me", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log("Response data:", data);
                setUser(data);
    
                // Now simulate a short loader delay after response
                setTimeout(() => {
                    setShowLoader(false);
                    setShowSuggestion(true);
                }, 2500); // Short 2.5 second loader after data fetch
    
            } catch (error) {
                console.error("Error fetching user data:", error);
                setShowLoader(false);
            }
        }
    
        userData();
    }, []);

    const handleEdit = (field) => {
        setEditing(prev => ({
            ...prev,
            [field]: true
        }));
    };

    const handleSave = (field, value) => {
        // Validation
        if (field === 'email' && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert('Please enter a valid email address');
            return;
        }
        if (field === 'mobile' && !value.match(/^\d{10}$/)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        const newData = {
            ...profileData,
            [field]: value
        };
        setProfileData(newData);
        setEditing(prev => ({
            ...prev,
            [field]: false
        }));
        localStorage.setItem('profileData', JSON.stringify(newData));
    };

    const handleKeyPress = (e, field, value) => {
        if (e.key === 'Enter') {
            handleSave(field, value);
        }
    };

    return (
        <div className='bg-gray-100 overflow-x-hidden h-screen w-screen'>
            <div className='absolute z-10 w-full'><Navbar /></div>
            <motion.img 
                initial={{ y: "78%" }}
                animate={{ y: 0 }}
                transition={{ delay:2, duration: 1.3, ease: "easeOut" }}
                className='absolute h-[24vh] top-28 left-[25vw] w-[14vw]' 
                src={PBoy} 
                alt="" 
            />
            {/* <img className='absolute h-[24vh] top-28 left-[25vw] w-[14vw]' src={PBoy} alt="" /> */}
            <div className='h-full w-full relative flex justify-center items-center gap-10 ' >
                <div className='h-[25vh] p-1 w-[20vw] relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 backdrop-blur-xs'>

                    <div className='h-[100%] w-full pt-[10%] rounded-3xl bg-white '>
                        <div className='text-center '>
                            <h1 className='text-3xl font-semibold' >{user.username}</h1>
                        </div>
                        <div className='mt-6  ml-6'>
                            <div className='bg-gray-100 mb-4 py-1 px-4 rounded-lg w-[92%] h-12'>
                            <p className='text-xs font-semibold text-gray-500'>Email</p>
                            <p>{user.email}</p>
                            </div>
                            {/* <div className='bg-gray-100 py-1 mb-4 px-4 rounded-lg w-[92%] h-12'>

                                <p className='text-xs font-semibold text-gray-500'>Mobile</p>
                                <p>{user.number}</p>

                            </div>
                            <div className='bg-gray-100 py-1 mb-4 px-4 rounded-lg w-[92%] h-12'>
                            <p className='text-xs font-semibold text-gray-500'>Gender</p>
                            <p>{user.gender}</p>
                            </div> */}

                        </div>
                    </div>
                </div>
                <div className='h-[60vh] w-[32vw] relative p-1 rounded-3xl bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 backdrop-blur-xs'>


                    <div className='h-full w-full pt-[10%] flex justify-center text-center items-center rounded-3xl bg-white '>
                        {showLoader && (
                            <div>
                                <div className="absolute text-blue-600 left-[5vw] font-semibold text-4xl top-[30%]">
                                    <Typewriter
                                        words={["Analyzing your career", "Processing your data", "Generating results"]}
                                        loop={true}
                                        cursor
                                        cursorStyle="."
                                        typeSpeed={60}
                                        deleteSpeed={30}
                                        delaySpeed={2000}
                                    />
                                </div>
                                <div className="custom-loader"></div>
                            </div>
                        )}

                        {/* Second block (visible after 15 sec) */}
                        {showSuggestion && (
                            <div className="absolute text-center top-[32%]">
                                <h2 className="text-4xl font-semibold text-blue-600">Here's your best match!</h2>
                                <h2 className="mt-10 text-4xl py-2 font-bold bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 bg-clip-text text-transparent">"{careerSuggestion}"</h2>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Profile