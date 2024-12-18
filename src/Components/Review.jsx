import React from 'react'
import u1 from '../assets/U1.svg'
import u2 from '../assets/U2.svg'
import u3 from '../assets/U3.svg'
import f from '../assets/filledStar.svg'
import e from '../assets/emptyStar.svg'


const Review = () => {
    const reviews = [
        {image : u1, name : 'Rohit Singh', review : 'An invaluable tool for job seekers! This platform helped me refine my resume and prepare with mock interviews, boosting my confidence and matching me with roles suited to my skills.',rating : 4},
        {image : u2, name : 'Ramit Shukla', review : 'Impressive AI-driven insights! The resume analyzer provides tailored feedback, while the interview module offers realistic mock interviews. A must-have for anyone aiming to land their dream job.',rating : 4},
        {image : u3, name : 'Asmit Katiyar', review : 'Easy to use and highly effective! The site’s resume suggestions and job role analysis helped me stand out, and the interview practice feature was incredibly helpful for improving my responses.',rating : 5}
    ]


  return (
    <div className='px-32 py-16 flex flex-col items-center bg-[#F5CB5C]'>

      <p className='font-DM-Serif-display text-[#333533] text-[56px]'>Review</p>

      <div className='flex flex-row gap-12 mt-20'>
        {reviews.map((item, index)=>(
            <div key = {index}  className='p-10 rounded-xl bg-white flex flex-col items-center'>
                <img src={item.image} className='w-16 h-16 rounded-full'/>
                <p className='text-[24px] font-DM-Serif-display mt-2'>{item.name}</p>
                <p className='text-xl font-Inter mt-8 text-justify px-1'>{item.review}</p>
                <div className='flex flex-row mt-10'>
                    {[...Array(item.rating)].map((_,index) => (<img key = {index} src={f} className='w-8 h-7'/>))}
                    {[...Array(5-item.rating)].map((_,index) => (<img key = {index} src={e} className='w-8 h-7'/>))}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Review
