import React from 'react'

function DiffCareers() {
  return (
    <div id='page2' className='relative '>
    <div className=' bg-gray-100 '>
      <div className='h-[40vh] w-full flex'>
        <div className='w-[50%] flex flex-col ml-40 justify-center'>
          <h1 className='text-5xl font-semibold mb-2 mt-8 ml-2'>Doctor</h1>
          <p className='text-md p-3'>A doctor diagnoses and treats illnesses, helps in maintaining health, and provides medical advice. Specializations include general medicine, surgery, and more. It requires extensive education, including medical school and internships.</p>
        </div>

        <div className='w-[50%] flex relative justify-center mr-20 items-end' >
          <img id='doc' className='h-[90%] mr-[30%]   ' src='../BGR/Doc.png' alt='' />
        </div>

      </div>
      <div className='h-[40vh] w-full flex'>
        <div className='w-[50%] flex relative justify-center ml-20 items-end' >
          <img className='h-[100%] ml-[20%] ' src='../BGR/Engg.png' alt='' />
        </div>
        <div className='w-[50%] flex flex-col mr-32 justify-center'>
          <h1 className='text-5xl mb-2 mt-8 font-semibold ml-2'>Engineer</h1>
          <p className='text-md p-3'>Engineers design, build, and maintain structures, machines, and systems. They apply scientific principles to solve real-world problems. Common fields include civil, mechanical, software, and electrical engineering.
          </p>
        </div>

      </div>
      <div className='h-[40vh] w-full flex'>
        <div className='w-[50%] flex flex-col ml-40 justify-center'>
          <h1 className='text-5xl mb-2 mt-8 font-semibold ml-2'>Teacher</h1>
          <p className='text-md p-3'>Teachers educate students by imparting knowledge and skills in various subjects. They create lesson plans, assess progress, and guide students academically and personally. Teaching can range from primary to higher education.
          </p>
        </div>

        <div className='w-[50%] flex relative justify-center mr-28 items-end' >
          <img className='h-[100%] mr-[30%] ' src='../BGR/teacher.png' alt='' />
        </div>

      </div>
      <div className='h-[40vh] w-full flex'>
        <div className='w-[50%] flex relative justify-center ml-20 items-end' >
          <img className='h-[100%] ml-[20%] ' src='../BGR/soldier.png' alt='' />
        </div>
        <div className='w-[50%] flex flex-col mr-32 justify-center'>
          <h1 className='text-5xl mb-2 mt-8 font-semibold ml-2'>Soldier</h1>
          <p className='text-md p-3'>Soldiers serve in the military, protecting the country and its citizens. Their duties include defense operations, combat, and peacekeeping missions. Physical fitness, discipline, and teamwork are essential.
          </p>
        </div>

      </div>
      <div className='h-[40vh] w-full flex'>
        <div className='w-[50%] flex flex-col ml-40 justify-center'>
          <h1 className='text-5xl mb-2 mt-8 font-semibold ml-2'>Police</h1>
          <p className='text-md p-3'>Police officers maintain public safety by enforcing laws, preventing crime, and investigating criminal activities. They also play a role in community support and crisis management.
          </p>
        </div>

        <div className='w-[50%] flex relative justify-center mr-20 items-end' >
          <img className='h-[100%] mr-[30%]   ' src='../BGR/police.png' alt='' />
        </div>

      </div>
      <div className='h-[40vh] w-full flex'>
        <div className='w-[50%] flex relative justify-center ml-20 items-end' >
          <img className='h-[100%] ml-[20%] ' src='../BGR/pilot.png' alt='' />
        </div>
        <div className='w-[50%] flex flex-col mr-32 justify-center'>
          <h1 className='text-5xl mb-2 mt-8 font-semibold ml-2'>Pilot</h1>
          <p className='text-md p-3'>Pilots operate aircraft, ensuring the safe transportation of passengers or cargo. They require extensive training, flight hours, and certification to fly commercial or private planes.
          </p>
        </div>

      </div>

    </div>
  </div>
  )
}

export default DiffCareers