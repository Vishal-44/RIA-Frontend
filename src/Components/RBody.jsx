import React, { useState } from 'react'
import upl from '../assets/uploadImage.svg'

const RBody = () => {
    const [resume , setResume] = useState(null)
    const [jobRole, setJobRole] = useState('')
    const [result,setResult]= useState(null)
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

    const handleSubmit = async () => {
        if (!resume || !jobRole) {
            alert('Please provide both resume and job role.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('jobRole', jobRole);

        try {
            const response = await fetch('http://localhost:3000/r/analyse-resume', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to analyze the resume');
            }

            const result = await response.json();
            console.log(result); // Log the response data
            // console.log(result.analysis)
            console.log(typeof(result.analysis))
            setResult(result.analysis)
        } catch (error) {
            alert("something went wrong.")
            console.error('Error:', error);
        }
    };

    const content = ['Feedback', 'Get ATS Score', 'Detailed Overview', 'Job Profile Suggestion']
  return ( 
    <div className='w-screen px-36 py-4 bg-[#F5CB5C]'>
        { !result && 
        <div className='flex flex-row gap-28 justify-center mt-6'>
            {/* card */}
            <div className="flex flex-col p-6 bg-white w-[600px] rounded-xl">
                <p className='font-Inter font-bold text-[#333533] text-[25px]'>Upload your resume</p>
                <p className='text-md font-Inter text-[#929292] mt-1'>Select your resume</p>
                <label htmlFor = 'resume' className='flex flex-col items-center mt-6 py-6 border-[1.5px] border-dashed border-[#a5a5a5] rounded-xl'>
                    
                    <img src={upl} className='w-[56px] h-[72px]' />
                    <p className='text-md font-Inter text-[#929292] mt-2'>Only PDF format</p>
                    <p className='text-md font-Inter text-[#929292]'>File Size less then 2MB.</p>
                    <p className='text-md font-Inter text-[#929292]'>{resume && resume.name || `No file selected.`}</p>
                </label>
                <input type="file" id = 'resume' name="resume" onChange = {handleResumeChange} className='w-full h-full hidden'/>
                <div className='relative mt-8'>
                    <textarea  name = 'job-role' value={jobRole} onChange = {handleJobRoleChange} placeholder='Job Role' className='text-[#333533] text-md font-Inter outline-none w-full pl-10 pr-8 py-[14px] rounded-xl bg-[#EBEBEB]'/>
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
        </div>}

        {result && 
        <div className='grid grid-flow-row grid-cols-3 gap-4'>
            <div className='col-span-3'>
                <p className='font-Inter font-bold text-[#333533] text-xl'> Resume Feedback. </p>
            </div>
            <div className='bg-white rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'> Does the resume contains typing mistakes </p>
                <p className='text-md font-Inter text-[#333533] mt-2'>{result.isTypo} </p>
            </div>

            <div className='bg-white rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'> Percentage match with Job description. </p>
                <p className='text-md font-Inter text-[#333533] mt-2'> {result.percentageMatch} </p>
            </div>

             <div className='bg-white rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'> Used Action Verbs in resume.</p>
                <p className='text-md font-Inter text-[#333533] mt-2'> {result.usedActionVerbs} </p>
            </div>

            <div className='bg-white col-span-2 rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'>  Career Summary </p>
                <p className='text-md font-Inter text-[#333533] mt-2'>{result.careerSummary}  </p>
            </div>

            <div className='bg-white rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'> Skills </p>
                {result.skills.map((skill) => <p className='text-md font-Inter text-[#333533] mt-2'>{skill}</p>)}
            </div>

            
            <div className='bg-white rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'> Does resume have relevant projects? </p>
                <p className='text-md font-Inter text-[#333533] mt-2'> {result.haveRelevantProject} </p>
            </div>

            <div className='bg-white rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'> Matched Keywords with Job description </p>
                {result.matchedKeywords.map((keyword) => <p className='text-md font-Inter text-[#333533] mt-2'>{keyword}</p>)}
            </div>

            <div className='bg-white rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'> Does the resume is Quantified? </p>
                <p className='text-md font-Inter text-[#333533] mt-2'> {result.isQuantified} </p>
            </div>

            <div className='bg-white rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'> Resume Keywords </p>
                {result.resumeKeywords.map((keyword) => <p className='text-md font-Inter text-[#333533] mt-2'>{keyword}</p>)}
            </div>

            <div className='bg-white col-span-2 rounded-xl p-8'>
                <p className='font-Inter font-bold text-[#333533] text-md'> Suggested Improvements </p>
                {result.improvements.map((pts) => <p className='text-md font-Inter text-[#333533] mt-2'>{pts}</p>)}
            </div>

        </div>
        }

        
    </div>
  )
}

export default RBody
