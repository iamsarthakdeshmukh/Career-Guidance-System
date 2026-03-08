import React from 'react'
import Spline from '@splinetool/react-spline';
import Rutik from '../assets/images/Rutik.jpg'
import Aditya from '../assets/images/Aditya.jpg'
import Sarthak from '../assets/images/Sarthak.jpg'
import Vedika from '../assets/images/Vedika.jpg'
import Footer from '../components/Footer';



import Navbar from '../components/Navbar';

function Developers() {

  return (

    <div className='overflow-x-hidden bg-[#D1D1E3] '>

      <div id='pg1' className=' h-[100vh] w-[100vw] relative bg-[#E3E3E3] text-center'>
        <div className='absolute w-full' >
          <Navbar />
        </div>


        <div className='p-5 absolute top-[25%]  left-20 rounded-xl w-[20vw] hover:scale-[100.8%] bg-white shadow-2xl'>
          <div>
            <img className='h-[32vh] rounded-xl w-[18vw]' src={Rutik} alt="" />
            <h1 className='text-2xl font-bold mt-2'>Rutik Darekar </h1>
            <p className='text-sm mt-3'> <span className='font-semibold'>Full Stack Developer </span> 
            Developer Skilled in both frontend and backend development, creating seamless and scalable web applications. Proficient in technologies like React, Node.js, Express, and MongoDB, ensuring a smooth user experience and efficient data management.</p>
          </div>
        </div>


        <div className='p-5 absolute top-[25%] right-20  rounded-xl w-[20vw] hover:scale-[100.8%] bg-white shadow-2xl'>
          <div>
            <img className='h-[32vh] rounded-xl w-[18vw]' src={Vedika} alt="" />
            <h1 className='text-2xl font-bold mt-2'>Vedika Kharde</h1>
            <p className='text-sm mt-3'><span className='font-semibold'>Python Developer</span> Experienced in building scalable applications and automation using Python. Proficient in frameworks like Django and Flask for web development, and skilled in data handling, scripting, and API integration.</p>
          </div>
        </div>



        {/* <div className='h-[6vh] absolute w-[10vw] bottom-5 right-5 bg-[#D2D2E3]'>
        </div> */}
        <Spline scene="https://prod.spline.design/MF8ILhe5oLnwnD2F/scene.splinecode" />
      </div>

      <div id='pg2' className='h-[60vh] relative w-screen '>
        <div className='p-5 absolute  top-[-12%] left-[25%] rounded-xl w-[20vw] hover:scale-[100.8%] bg-white shadow-2xl'>
          <div className='text-center' >
            <img className='h-[32vh] rounded-xl w-[18vw]' src={Sarthak} alt="" />
            <h1 className='text-2xl font-bold mt-2'>Sarthak Deshmukh</h1>
            <p className='text-sm mt-3'> <span className='font-semibold'>Salesforce Developer</span> Expert in building and customizing Salesforce applications to enhance business processes. Skilled in Apex, Visualforce, Lightning Web Components (LWC), and Salesforce automation to deliver scalable and efficient CRM solutions.</p>
          </div>
        </div>
        
        <div className='p-5 absolute top-[-12%] right-[25%] rounded-xl w-[20vw] hover:scale-[100.8%] bg-white shadow-2xl'>
          <div className='text-center'>
            <img className='h-[32vh] rounded-xl ml-1 w-[17vw]' src={Aditya} alt="" />
            <h1 className='text-2xl font-bold mt-2'>Aditya Jadhav</h1>
            <p className='text-sm mt-3'><span className='font-semibold'>Backend Developer</span> Specialized in building and maintaining server-side applications, databases, and APIs. Proficient in technologies like Node.js, Express ensuring seamless data flow, security, and performance optimization. .</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Developers