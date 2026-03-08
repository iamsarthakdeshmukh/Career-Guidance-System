import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css'; // Import Locomotive Scroll CSS
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Cloud2 from '../assets/images/cloud.png'
import Cloud1 from '../assets/images/cloud1.png'
import DiffCareers from '../components/DiffCareers';
import Check from '../components/Check';
import Cloud3 from '../assets/images/cloud3.png'
import Footer from '../components/Footer';

function LandingPg() {

  const scrollRef = useRef(null); // UseRef to track the scroll container


  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current, // Attach Locomotive to the main scrollable container
      smooth: true,
      multiplier: 1,
    });

    // Cleanup Locomotive Scroll on component unmount
    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} id="main" data-scroll-container className='relative overflow-hidden'>

      {/* Navbar with Framer Motion animation */}
      <Navbar />

      <HeroSection />

      <div className='h-[28vh] w-full'>
        <img className='h-[100%] w-full' src={Cloud1} alt="" />
      </div>

      <DiffCareers />

      <div className='h-[40vh] relative w-full'>
        <img className='h-[100%] w-full' src={Cloud2} alt="" />
      </div>

      <Check id='3' />

      <div className='h-[40vh] w-full relative'>
        <img className='h-[100%] w-full' src={Cloud3} alt="" />
      </div>

      <Footer />

      <div className='bg-black text-white flex justify-center items-center h-[10vh] text-center'> Copyright &copy;
        2024 Career Guidance Pvt. Ltd. <br />
        All Rights Reserved.
      </div>
    </div>
  );
}

export default LandingPg;
