// app/api/save-image/route.tsx
import { storage } from "@/config/firebaseConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { url } = data;

        // Move convertImage function inside the POST handler
        const convertImage = async (imageUrl: string) => {
            try {
                const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const base64Image = Buffer.from(response.data).toString('base64');
                return base64Image;
            } catch (error) {
                console.log('Error converting image into base64', error);
                throw error;
            }
        };

        const base64Image = await convertImage(url);
        const fileName = '/ai-story/' + Date.now() + ".png";
        const imageRef = ref(storage, fileName);

        await uploadString(imageRef, base64Image, 'base64').then((snapshot) => {
            console.log('Uploaded image successfully');
        });

        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);

        return NextResponse.json({ imageUrl: downloadURL });
    } catch (error) {
        console.error('Error uploading image', error);
        return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
    }
}
