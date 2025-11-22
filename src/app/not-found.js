import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <>
    
    <div class="container flex flex-wrap justify-center items-center  mx-auto">
        <div className="pt-5 text-center">
            <img className='pt-5' src='./error.png' alt='error'/>
           <Link href="/" ><Button className="my-5 bg-[#359487] dark:bg-white">Go Back To Home</Button> </Link> 
        </div>
    </div>
    
 
    </>
  )
}
