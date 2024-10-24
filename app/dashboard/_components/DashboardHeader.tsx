"use client"
import Image from 'next/image'
import React from 'react'
import { useContext } from 'react'
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

const DashboardHeader = () => {

  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  return (
    <div className='p-7 bg-primary text-white flex justify-between items-center'>
      <h2 className='font-bold text-3xl'>My Stories</h2>
      <div className='flex gap-3 items-center'>
        <Image src={'/coin.png'} width={50} height={50} alt='coin' />
        <span className='text-2xl'>{userDetail?.credit} Credits Left</span>
        <Link href={'/buy-credits'}>
        <Button className='bg-blue-400' >Buy More Credits</Button>
        </Link>
      </div>
    </div>
  )
}

export default DashboardHeader
