import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
  return (
    <div className='px-44 py-24 bg-[#333533] grid grid-cols-4 gap-20'>
        <div>
            <div className='font-bold text-xl text-white font-Inter'>RIA</div>
            <div className='text-slate-300 mt-4 text-justify text-sm'>This website is dedicated to help student to analyze their resume and improve it. Website aims to make ease in making job specific resume and get you ready for company interviews.</div>
        </div>

        <div className='pl-16'>
            <div className='font-bold text-lg text-white font-Inter'>Features</div>
            <ul className='text-slate-300 mt-4 cusor-pointer'>
                <li onClick={()=>{navigate('/resume-analyzer')}}>Resume Analyzer</li>
                <li>Mock Interview</li>
            </ul>
        </div>

        <div className='pl-16'>
        <div className='font-bold text-lg text-white font-Inter'>Support</div>
            <ul className='text-slate-300 mt-4 cusor-pointer'>
                <li>FAQs</li>
                <li>Terms & Condition</li>
                <li>Privacy Policy</li>
                <li>About Us</li>
            </ul>
        </div>

        <div className='pl-16'>
        <div className='font-bold text-lg text-white font-Inter'>Social Links</div>
            <ul className='text-slate-300 mt-4 cusor-pointer'>
                <li>Instagram</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>Facebook</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer
