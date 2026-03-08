import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Journalist from '../assets/images/Journalist.png';
import Lawyer from '../assets/images/Lawyer.png'
import Enterpreneur from '../assets/images/Enterpreneur.png'
import Developer from '../assets/images/Developer.png'
import Mech from '../assets/images/Mech.png'
import Finance from '../assets/images/Finance.png'
import MBBSDoc from '../assets/images/MBBSDoc.png'
import Navbar from '../components/Navbar';



const testimonials = [
  {
    src: Journalist,
    name: "Rohan Malhotra",
    designation: "Journalist at BBC News",
    quote: "From a curious storyteller to a recognized journalist, my journey was guided by the right career choices. Today, I uncover the truth and give a voice to the unheard."
  },
  {
    src: Lawyer, // You'll need to import more images and update these
    name: "Priya Desai",
    designation: "Lawyer at Supreme Court of India",
    quote: "From understanding legal frameworks to winning my first case, this platform set me on the path to success. Now, I stand for justice and make a difference every day."
  },
  {
    src: Enterpreneur, // You'll need to import more images and update these
    name: "Aditya Verma ",
    designation: "Entrepreneur, Founder of NextGen Tech Solutions",
    quote: "Turning ideas into reality was a dream—now it's my career. Thanks to the right guidance, I built my own startup and am making an impact in the industry."
  },
  {
    src: Developer, // You'll need to import more images and update these
    name: "Neha Kapoor",
    designation: "Software Developer at LTIMindtree",
    quote: "From writing my first line of code to solving real-world problems, this platform helped me navigate my tech career. Now, I build innovative software solutions."
  },
  {
    src: Mech, // You'll need to import more images and update these
    name: "Arjun Patil",
    designation: "Mechanical Engineer at Tesla",
    quote: "Engineering was my passion, and today, I design machines that shape the future. This platform helped me find my path and refine my skills."
  },

  {
    src: Finance, // You'll need to import more images and update these
    name: "Sakshi Mehta",
    designation: "Finance Expert at Goldman Sachs",
    quote: "From writing my first line of code to solving real-world problems, this platform helped me navigate my tech career. Now, I build innovative software solutions."
  },
  {
    src: MBBSDoc, // You'll need to import more images and update these
    name: "Dr. Neha Sharma",
    designation: "MBBS at Apollo Hospitals, Mumbai",
    quote: "From a passionate student to a dedicated doctor, this platform helped me make the right career decisions. Today, I save lives and make a real difference in healthcare."
  },

];

function Results() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (

    <div className='h-screen w-screen'>
      <div className='absolute  text-center w-full'>
        <Navbar />
        <div>
          <h1 className='text-4xl text-blue-600 absolute text-center w-full top-[180%] font-semibold ' >Our Results</h1>
        </div>
      </div>
      
      <div className='h-screen w-full bg-gray-100 flex justify-center items-center py-20'>
        <div className="mx-auto max-w-sm px-4 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
          <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
            <div>
              <div className="relative h-80 w-full">
                <AnimatePresence>
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        z: -100,
                        rotate: randomRotateY(),
                      }}
                      animate={{
                        opacity: index === active ? 1 : 0.7,
                        scale: index === active ? 1 : 0.95,
                        z: index === active ? 0 : -100,
                        rotate: index === active ? 0 : randomRotateY(),
                        zIndex: index === active ? 40 : testimonials.length + 2 - index,
                        y: index === active ? [0, -80, 0] : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        z: 100,
                        rotate: randomRotateY(),
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <img
                        src={testimonial.src}
                        alt={testimonial.name}
                        className="h-full w-full rounded-3xl object-cover object-center"
                        draggable={false}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col justify-between py-4">
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                <h3 className="text-2xl font-bold text-black">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-gray-500">
                  {testimonials[active].designation}
                </p>
                <motion.p className="mt-8 text-lg text-gray-500">
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>

              <div className="flex gap-4 pt-12 md:pt-0">
                <button
                  onClick={handlePrev}
                  className="group flex h-7 w-7 items-center justify-center rounded-full  hover:bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 backdrop-blur-xs  transition-colors"
                >
                  <IconArrowLeft className="h-5 w-5 text-blue-600 hover:text-white transition-transform duration-300 group-hover:rotate-12" />
                </button>
                <button
                  onClick={handleNext}
                  className="group flex h-7 w-7 items-center justify-center rounded-full   hover:bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 backdrop-blur-xs transition-colors"
                >
                  <IconArrowRight className="h-5 w-5 text-blue-600  hover:text-white transition-transform duration-300 group-hover:-rotate-12" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;