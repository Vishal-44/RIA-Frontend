import React from 'react'
import { useNavigate } from 'react-router-dom'

const Features = () => {
  const navigate = useNavigate()
  return (
    <div className='py-16 px-20 text-[#333533] flex flex-col gap-12'>

      <div className='flex flex-row gap-32'>
        <span className='w-2/5 font-DM-Serif-display text-[56px] border-e-2 border-[#333533]'>Analyze your Resume</span>
        <div className='w-3/5 flex flex-col items-start gap-6'>
            <span className='text-xl font-Inter'>Resume is most important document that helps you to impress recruiter, we help you get a perfect one for yourself.Analyze our resume aligned with job roles using AI and get real-time feedback to improve your resume.</span>
            <button className='w-16 py-1 bg-[#F5CB5C] rounded-sm text-md font- font-medium font-Inter' onClick={()=>{navigate('/resume-analyzer')}}>Try it</button>
        </div>
      </div>

      <div className='flex flex-row gap-32'>
        <span className='w-2/5 font-DM-Serif-display text-[56px] border-e-2 border-[#333533]'>Analyze your Resume</span>
        <div className='w-3/5 flex flex-col items-start gap-6'>
            <span className='text-xl font-Inter'>Resume is most important document that helps you to impress recruiter, we help you get a perfect one for yourself.Analyze our resume aligned with job roles using AI and get real-time feedback to improve your resume.</span>
            <button className='w-16 py-1 bg-[#F5CB5C] rounded-sm text-md font- font-medium font-Inter'>Try it</button>
        </div>
      </div>

    </div>
  )
}

export default Features
