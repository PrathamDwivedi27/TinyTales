import Image from 'next/image'
import React from 'react'

const BookCoverPage = ({imageUrl}:any) => {
  return (
    <div>
      <Image src={imageUrl} alt='cover' width={500} height={500}/>
    </div>
  )
}

export default BookCoverPage