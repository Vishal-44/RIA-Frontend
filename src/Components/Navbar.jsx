import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='py-8 px-20 flex flex-row gap-28'>
        <span className='font-bold text-xl text-[#333533] font-Inter'>RIA</span>
        {/* nav menu */}
        <ul className='flex flex-row gap-8 text-md font-Inter text-[#333533] cursor-pointer'>
            <li onClick={()=>{navigate('/resume-analyzer')}}>Analyze Resume</li>
            <li onClick={()=>{navigate('/interview')}}>Mock Interview</li>
        </ul>
    </div>
  )
}

export default Navbar
