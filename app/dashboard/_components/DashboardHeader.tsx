import Image from 'next/image'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='p-7 bg-primary text-white flex justify-between items-center'>
      <h2 className='font-bold text-3xl'>My Stories</h2>
      <div className='flex gap-3 items-center'>
        <Image src={'/coin.png'} width={50} height={50} alt='coin' />
        <span className='text-2xl'>3 Credits Left</span>
      </div>
    </div>
  )
}

export default DashboardHeader
