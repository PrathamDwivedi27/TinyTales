import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import Header from './_components/Header'

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='bg-[#cad3ff]'>
       <ClerkProvider>
       <NextUIProvider>
        {/* Header */}
        <Header/>
        {children}
       </NextUIProvider>
       </ClerkProvider>
       
    </div>
  )
}

export default Provider
