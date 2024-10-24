"use client"
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import Header from './_components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState,useEffect } from "react";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from './_context/UserDetailContext'



const Provider = ({children}:{children:React.ReactNode}) => {
  const [userDetail,setUserDetail]=useState<any>();
const {user}=useUser();

useEffect(()=>{
  user && saveNewUserIfNotExist();
},[user])

const saveNewUserIfNotExist=async()=>{
  //check if user exist
  const userResp=await db.select().from(Users)
  .where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??""));

  console.log(userResp);

  if(!userResp[0]){
    const result=await db.insert(Users).values({
      userEmail:user?.primaryEmailAddress?.emailAddress??"",
      userName:user?.fullName??"",
      userImage:user?.imageUrl
    }).returning({
      userEmail:Users.userEmail,
      userName:Users.userName,
      userImage:Users.userImage,
      credit:Users.credit
    })
    console.log("new",result[0]);
    setUserDetail(result[0]);
  }
  else{
    console.log("old",userResp[0]);
    setUserDetail(userResp[0]);
  }
}
  return (
    <div className='bg-[#cad3ff]'>
       <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
       <NextUIProvider>
        {/* Header */}
        <Header/>
        {children}
        <ToastContainer />
       </NextUIProvider>
       </UserDetailContext.Provider>
     </div> 
  )
}

export default Provider
