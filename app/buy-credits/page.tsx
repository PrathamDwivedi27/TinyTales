"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useContext } from 'react';
import { UserDetailContext } from '../_context/UserDetailContext';
import { Users } from '@/config/schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const BuyCredits = () => {
    const options=[
        {
            id:1,
            price:1.99,
            credits:10
        },
        {
            id:2,
            price:3.99,
            credits:30
        },
        {
            id:3,
            price:5.99,
            credits:50
        },
        {
            id:4,
            price:9.99,
            credits:100
        },
    ]

    const [selectedOption,setSelectedOption]=useState<number>(0);
    const [selectedPrice,setSelectedPrice]=useState<number>(0);

    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const notify=(msg:string)=>toast(msg);
    const notifyError=(msg:string)=>toast.error(msg);
    
    const router=useRouter();
    useEffect(()=>{
        if(selectedOption>0){
            const price=options[selectedOption-1].price;
            console.log(price);
            setSelectedPrice(price);
        }
    },[selectedOption])

    const onPaymentSuccess=async()=>{
        const result=await db.update(Users)
        .set({
            credit:options[selectedOption-1].credits+userDetail.credit
        }).where(eq(Users.userEmail,userDetail.userEmail))

        if(result){
            notify("Payment is Successfull. Credits are added");
            setUserDetail((prev:any)=>({
                ...prev,
                ['credit']:options[selectedOption-1].credits+userDetail.credit
              }))
              router.replace('/dashboard');
        }
        else {
            notifyError("Something went wrong. Please try again");
        }
        
    }

  return (
    <div className='min-h-screen text-center p-10 md:px-20 lg:px-40'
    >
      <h2 className='text-4xl font-bold text-primary'>
        Add More Credits
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 items-center'>
        <div>
            {
                options.map((option,index)=>(
                    <div key={option.id} className={`bg-primary p-6 my-3 text-center 
                        rounded-lg text-white cursor-pointer 
                        hover:scale-105 transition-all
                        ${selectedOption===option.id&&'bg-black'}
                        `}
                    onClick={()=>setSelectedOption
                        (option.id)
                    }
                    >
                        <h2 >Get {option.credits} Credits={option.credits} Story</h2>
                        <h2 className='font-bold text-2xl'>${option.price}</h2>
                    </div>
                ))
            }
        </div>
        <div>
                    {/* PayPal Buttons */}
                    {selectedPrice>0 &&<PayPalButtons 
                        style={{ layout: "vertical" }} 
                        disabled={!selectedOption || selectedOption==0}  // Disables if no option is selected
                        // @ts-ignore
                        onApprove={()=>onPaymentSuccess()}
                        onCancel={()=>notifyError("Payment is cancelled")}
                        createOrder={(data, actions) => {
                            // @ts-ignore
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        // @ts-ignore
                                        amount: {
                                            value: selectedPrice.toFixed(2),
                                            currency_code: "USD",
                                        },
                                    },
                                ],
                            });
                        }}
                    />}
                </div>

      </div>
    </div>
  )
}

export default BuyCredits
