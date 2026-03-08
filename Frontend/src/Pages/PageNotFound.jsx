import React from 'react'
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {

  const navigate = useNavigate();


  return (
    <div className='h-[100vh] w-[100vw] bg-[#E3E3E3] text-center'>
      <div className='absolute top-3 w-full flex justify-center gap-5' >
        <button
          onClick={() => navigate('/')}
          className='bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 backdrop-blur-xs text-white font-semibold py-3 px-7 rounded-2xl'>
          Go to Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className='bg-gradient-to-r from-purple-500/70 via-blue-500/80 to-cyan-400/80 backdrop-blur-xs text-white font-semibold py-3 px-7 rounded-2xl'>
          Back
        </button>
      </div>
      <div className='h-[6vh] absolute w-[10vw] bottom-5 right-5 bg-[#E3E3E3]'>
      </div>
         <Spline scene="https://prod.spline.design/cfxG0KnonKwXp9wj/scene.splinecode" />
    </div>
  )
}

export default PageNotFound