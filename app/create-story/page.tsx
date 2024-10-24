"use client"
import React, { useContext, useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@nextui-org/button';
import { chatSession } from '@/config/GeminiAi';
import uuid4  from "uuid4"
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import CustomLoader from './_components/CustomLoader';
import axios from 'axios';
import { url } from 'inspector';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { UserDetailContext } from '../_context/UserDetailContext';

const CREATE_STORY_PROMPT=process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData{
  fieldName:string,
  fieldValue:string
}

export interface formDataType{
  storySubject:string,
  storyType:string,
  imageStyle:string,
  ageGroup:string
}

const CreateStory = () => {

  const [formData,setFormData]=useState<formDataType>();
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  const notify=(msg:string)=> toast(msg);
  const notifyError=(msg:string)=> toast.error(msg);
  

  const {user}=useUser();
  const [userDetail,setUserDetail]=useContext(UserDetailContext);


  const onHandleUserSelection=(data:fieldData)=>{
    // console.log(data);
    // notify()
    setFormData((prev:any)=>({
      ...prev,
      [data.fieldName]:data.fieldValue
    }));
    console.log(formData);
  }

  const GenerateStory=async()=>{

    setLoading(true);
    //Generate AI Story
    const FINAL_PROMPT=CREATE_STORY_PROMPT
    ?.replace('{ageGroup}',formData?.ageGroup??'')
    .replace('{storyType}',formData?.storyType??'')
    .replace('{storySubject}',formData?.storySubject??'')
    .replace('{imageStyle}',formData?.imageStyle??'')

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const story = JSON.parse(result?.response.text());
      console.log(result?.response.text());
    
      const imageResp = await axios.post('/api/generate-image', {
        prompt: `Add text with title: ${story?.story_name} in bold text for book cover, ${story?.cover_image?.description}`
      });
    
      const AiImageUrl=imageResp?.data?.imageUrl;

      const imageResult=await axios.post('/api/save-image',{
        url:AiImageUrl
      })

      const FirebaseStorageImageUrl=imageResult.data.imageUrl
      
      const resp:any = await SaveInDB(result?.response.text(),FirebaseStorageImageUrl);
      notify('Story Generated Successfully');
      console.log(resp);
      router?.replace('/view-story/'+resp[0].storyId)
    } catch (error) {
      notifyError('Server Error, Try Again Later');
      console.error('Error generating image:', error);
      if ((error as any).response) {
        console.error('Server responded with status:', (error as any).response.status);
        console.error('Response data:', (error as any).response.data);
      } else if ((error as any).request) {
        console.error('No response received:', (error as any).request);
      } else {
        console.error('Error setting up request:', (error as any).message);
      }
    }
    

    
    //Generate Image
  }

  const SaveInDB=async (output:string,imageUrl:string)=>{
    const recordId=uuid4();
    setLoading(true);
    try {
      
    const result=await db.insert(StoryData).values({
      storyId:recordId,
      ageGroup:formData?.ageGroup ?? '',
      storyType:formData?.storyType ?? '',
      storySubject:formData?.storySubject ?? '',
      imageStyle:formData?.imageStyle ?? '',
      output:JSON.parse(output),
      coverImage:imageUrl,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl,
      userName:user?.fullName
    }).returning({storyId:StoryData.storyId})

    setLoading(false);
    return result;
    } catch (error) {
      setLoading(false);
      console.log(error);

    }
    
  }

  return (
    <div className='p-10 md:px-20 lg:px-40'>
      <h2 className='font-extrabold text-[70px] text-primary text-center'>Create Your Story</h2>
      <p className='text-2xl text-primary text-center'>Unlock your creativity with AI: Craft stories like never before! Let our AI bring your imagination to life, one story at a time.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
        {/* Story - Subject */}
        <StorySubjectInput userSelection={onHandleUserSelection}/>

        {/* Story-Type */}
        <StoryType userSelection={onHandleUserSelection}/>

        {/* Age Group */}
        <AgeGroup userSelection={onHandleUserSelection}/>

        {/* Image Style  */}
        <ImageStyle userSelection={onHandleUserSelection}/>
      </div>

      <div className='flex justify-end my-10 flex-col items-end'>
        <Button color='primary' 
        disabled={loading}
        className='p-10 text-2xl'
        onClick={GenerateStory}
        >Generate Story</Button>
        <span>1 Credit will be used</span>
      </div>
      <CustomLoader isLoading={loading}/>
    </div>
  )
}

export default CreateStory;
