import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <>
    .
    <div className="container flex flex-wrap justify-center items-center  mx-auto">
        <div className="pt-5 text-center">
          <Image className='pt-5' src='/error.png' alt='error' width={577} height={453}/>
          <Link href="/" ><Button className="my-5 bg-[#359487] dark:bg-white">Go Back To Home</Button> </Link> 
        </div>
    </div>
    
 
    </>
  )
}
