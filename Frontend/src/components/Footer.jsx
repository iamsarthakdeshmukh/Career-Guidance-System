import React from 'react'
import fb from '../assets/images/fb.png'
import insta from '../assets/images/insta.png'
import linkedin from '../assets/images/link.png'
import gmail from '../assets/images/gmail.png'
import x from '../assets/images/x.png'
import { FiSend } from 'react-icons/fi';


function Footer() {
  return (
    <footer className='h-[40vh] relative w-full flex bg-black '>

    <div className='h-[95%] w-[40%] flex flex-col justify-center items-center text-gray-50 '>
      <div className=' w-[60%] relative pt-20 p-2' >
        <h1 className='text-xl font-semibold mb-4'>About us</h1>
        <p className='text-sm text-gray-300 '>Our personalized assessments and insights ensure you find the profession that best suits your skills and passions. Explore your options and take control of your future with us!!</p>
      </div>
      <div className=' w-[60%] relative p-2' >
        <h1 className='text-xl font-semibold '>Connect with us</h1>
        <div className='h-12 w-[80%] flex items-center gap-2 mt-2 justify-start'>
          <button><img className='h-9' src={fb} alt="" /></button>
          <button><img className='h-8' src={insta} alt="" /></button>
          <button><img className='h-10' src={linkedin} alt="" /></button>
          <button><img className='h-8' src={gmail} alt="" /></button>
          <button><img className='h-7' src={x} alt="" /></button>

        </div>

      </div>
    </div>

    <div className='h-[90%] w-[15%] relative flex flex-col pt-14 items-start '>
      <h1 className='text-xl text-white font-semibold'>Services</h1>
      <div className='flex flex-col mt-5 gap-4 text-sm text-gray-300 font-semibold'>
        <h1>Home</h1>
        <h1>Contact</h1>
        <h1>Detail</h1>
        <h1>Address</h1>
      </div>
    </div>

    <div className='h-[90%] w-[15%] relative flex flex-col pt-14 items-start '>
      <h1 className='text-xl text-white font-semibold'>Contact</h1>
      <div className='flex flex-col mt-5 gap-4 text-sm text-gray-300 font-semibold'>
        <h1>Pravara Rural Engineering College, Loni</h1>
        <h1>+91 9975XXX85</h1>
        <h1>careerguidance@gmail.com</h1>
      </div>
    </div>

    <div className='h-[95%] w-[30%] relative flex flex-col pt-14 justify-start items-start ml-16'>
      <h1 className='text-xl ml-5 text-white font-semibold'>Subscribe Newsletter</h1>
      <div className="flex items-center mt-5 bg-white rounded-full shadow-md p-1 w-64">
        <input
          type="email"
          placeholder="Email Address"
          className="bg-transparent outline-none flex-grow pl-4 text-gray-700"
        />
        <button className="bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 p-2 rounded-full">
          <FiSend className="text-white" />
        </button>
      </div>


    </div>
  </footer>
  
  )
}

export default Footer