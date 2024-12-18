import React from 'react'
import img1 from '../assets/img1.svg'
import img2 from '../assets/img2.svg'
import img3 from '../assets/img3.svg'
import img4 from '../assets/img4.svg'
import img5 from '../assets/img5.svg'
import img6 from '../assets/img6.svg'

const BentoGrid = () => {
  return (
    <div className='flex justify-center'>
      <div className=' mt-8 p-8 grid grid-rows-3 grid-flow-col gap-8 h-[644px] w-[1280px] rounded-lg'>
          <div className='col-span-2 row-span-2 bg-no-repeat bg-cover rounded-lg' style={{backgroundImage : `url(${img1})`}}></div>
          <div className='col-span-4 row-span-1 bg-no-repeat bg-center bg-cover rounded-lg' style={{backgroundImage : `url(${img5})`}}></div>
          <div className='col-span-1 row-span-1 bg-no-repeat bg-center bg-cover rounded-lg' style={{backgroundImage : `url(${img2})`}}></div>
          <div className='col-span-1 row-span-1 bg-no-repeat bg-cover rounded-lg' style={{backgroundImage : `url(${img4})`}}></div>
          <div className='col-span-3 row-span-2 bg-no-repeat bg-center bg-cover rounded-lg' style={{backgroundImage : `url(${img3})`}}></div>
          <div className='col-span-2 row-span-1 bg-no-repeat bg-center bg-cover rounded-lg' style={{backgroundImage : `url(${img6})`}}></div>
          
      </div>
    </div>
  )
}

export default BentoGrid
