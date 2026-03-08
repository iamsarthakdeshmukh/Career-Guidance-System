import React from 'react'
import { motion } from 'framer-motion';
import CylGeometry from '../components/CylGeometry'
import { CiCircleChevDown } from "react-icons/ci";
import Girl from '../assets/images/girl1.png'


function HeroSection() {
  return (
    <div id='page1' className='relative select-none'>
    <div className='h-24 w-full relative'>
      <motion.div
        initial={{ y: 0, opacity: 0 }} // Starting position and opacity
        animate={{ y: 0, opacity: 1 }}  // Ending position and opacity
        transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
        className='flex justify-center items-end h-full'>
        <h1 id='text' className='text-6xl font-semibold'>Find The Best <span className='text-blue-600'>One.</span></h1>
      </motion.div>
    </div>

    <div className='h-[78vh] w-full flex justify-center items-center relative '>
      <div className='h-[90%] w-[55%] relative '>
        <CylGeometry />
      </div>

      <div className='h-[50%] w-[20%] absolute flex items-end right-2 bottom-20'>
        <motion.img
         initial={{ x: 100, opacity: 0 }} // Starting position and opacity
         animate={{ x: 0, opacity: 1 }}  // Ending position and opacity
         transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }} // Delay and duration
         id='girl1' className='h-[60%] w-[90%]' src={Girl} alt="" />
      </div>

      <div className='h-[15%] w-[15%] flex items-end justify-center absolute right-12 bottom-8 '>
        <h1 className='text-2xl font-semibold flex items-center gap-2'>
          Scroll down              <a href="#">
            <motion.div
              initial={{ y: -5 }}                   // Start 10px above its position
              animate={{ y: 0 }}                     // Move to its normal position
              transition={{
                duration: 0.5,                       // Duration of 0.5 seconds for each movement
                repeat: Infinity,                    // Repeat indefinitely
                repeatType: "reverse",               // Reverse the movement (so it goes back up)
                ease: "easeInOut"                    // Smooth easing
              }}
            >
              <CiCircleChevDown className='text-3xl text-blue-600' />
            </motion.div>
          </a>
        </h1>
      </div>
    </div>

  </div>
  )
}

export default HeroSection