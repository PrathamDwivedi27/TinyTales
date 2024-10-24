/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['firebasestorage.googleapis.com',
            'maps.googleapis.com', // Add this line for Google Maps
            'www.google.com', 
        ]
    }
};

export default nextConfig;
