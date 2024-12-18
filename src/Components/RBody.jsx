import React, { useState } from 'react'
import upl from '../assets/uploadImage.svg'
import jr from '../assets/jobRole.svg'

const RBody = () => {
    const [resume , setResume] = useState(null)
    const [jobRole, setJobRole] = useState('')

    const handleJobRoleChange = (e) => {
        const {value} = e.target
        if(value){    
            setJobRole(value)
        }
    }

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setResume(file)
    }

    const handleSubmit = () => {}

    const content = ['Feedback', 'Get ATS Score', 'Detailed Overview', 'Job Profile Suggestion']
  return (
    <div className='w-screen px-36'>
        <p className='font-DM-Serif-display text-[#333533] text-[56px] text-center'>Analyze your resume with ease</p>
        {/* card */}
        <div className='flex flex-row gap-28 justify-center mt-6'>
            <div className="flex flex-col p-6 bg-white w-[352px] rounded-xl">
                <p className='font-Inter font-bold text-[#333533] text-[25px]'>Upload your resume</p>
                <p className='text-md font-Inter text-[#929292] mt-1'>Select your resume</p>
                <label htmlFor = 'resume' className='flex flex-col items-center mt-6 py-6 border-[1.5px] border-dashed border-[#a5a5a5] rounded-xl'>
                    
                    <img src={upl} className='w-[56px] h-[72px]' />
                    <p className='text-md font-Inter text-[#929292] mt-2'>Only PDF format</p>
                    <p className='text-md font-Inter text-[#929292]'>File Size less then 2MB.</p>
                </label>
                <input type="file" id = 'resume' name="resume" onChange = {handleResumeChange} className='w-full h-full hidden'/>
                <div className='relative mt-8'>
                    <input type="text" name = 'job-role' value={jobRole} onChange = {handleJobRoleChange} placeholder='Job Role' className='text-[#333533] text-md font-Inter outline-none w-full pl-10 pr-8 py-[14px] rounded-xl bg-[#EBEBEB]'/>
                    <img src={jr} className='w-4 h-4 absolute start-4 top-0 bottom-0 m-auto'/>
                </div>
                <button className='p-[14px] bg-[#333533] text-white text-md font-Inter rounded-xl mt-3' onClick={handleSubmit}>
                    Upload & Analyze
                </button>
            </div>

            {/* about resume analyzer */}
            <div className='flex flex-col gap-5 items-start justify-center'>
            
            {
                content.map((point, index) => (<div key = {index} className='flex flex-row bg-white rounded-full items-center p-2'>
                    <p className='w-12 h-12 text-center bg-[#F5CB5C] text-[#333533] text-[32px] rounded-full'>{index+1}</p>
                    <p className='px-4 text-2xl font-Inter font-medium text-[#333533]'>{point}</p>
                </div>))
            }

                

                
            </div>
        </div>
    </div>
  )
}

export default RBody
