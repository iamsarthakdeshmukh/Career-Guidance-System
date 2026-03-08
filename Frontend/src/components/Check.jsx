import React from 'react'
import SideGirl from '../assets/images/girl.png'
import SideBoy from '../assets/images/boy2.png'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'

function Check() {

  const navigate = useNavigate();

  return (
    <div className='h-[60vh] w-full relative flex flex-col justify-start items-center'>
      <div>
        <h1 className="text-7xl font-bold cursor-context-menu mt-20 select-none">
          <span className=" bg-blue-600 bg-clip-text  text-transparent select-none">
            <Typewriter
              words={[
                "Unlock Your Future!",
                "Plan. Prepare. Succeed!",
                "Find Your Perfect Career!"
              
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </span>
        </h1>      
      
      <motion.button
        onClick={() => navigate('/login')}
        whileHover={{ scale: 1.05 }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className='bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 backdrop-blur-xs text-3xl mt-28 absolute left-[42%] text-white font-semibold px-16 py-4 rounded-full'
      >
        Get Started!
      </motion.button>
      </div>
      <img className='h-[80%] absolute left-0 top-0 ' src={SideGirl} alt="" />
      <img id='boy2' className='h-[95%] absolute right-0 bottom-0 ' src={SideBoy} alt="" />
    </div>
  )
}

export default Check