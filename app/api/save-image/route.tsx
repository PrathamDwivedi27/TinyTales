import { storage } from "@/config/firebaseConfig";
import axios from "axios";
import { NextRequest,NextResponse } from "next/server";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export async function POST(req: NextRequest) {
    const data=await req.json();
    const {url}=data;

    const base64Image=await convertImage(url);
    const fileName='/ai-story/'+Date.now()+".png";
    const imageRef=ref(storage,fileName);

    await uploadString(imageRef,base64Image,'base64').then((snapshot)=>{
        console.log('Uploaded image successfully');
    })

    const downloadURL=await getDownloadURL(imageRef);
    console.log(downloadURL);

    return NextResponse.json({imageUrl:downloadURL});
}

export const convertImage=async(imageUrl:string)=>{
    try {
        const response=await axios.get(imageUrl,{responseType:'arraybuffer'});
        const base64Image=Buffer.from(response.data).toString('base64');
        return base64Image;
    } catch (error) {
        console.log('Error converting image into base64');
    }
}