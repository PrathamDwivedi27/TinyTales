import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import Header from './_components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='bg-[#cad3ff]'>
       <ClerkProvider>
       <NextUIProvider>
        {/* Header */}
        <Header/>
        {children}
        <ToastContainer />
       </NextUIProvider>
       </ClerkProvider>
       
    </div>
  )
}

export default Provider
