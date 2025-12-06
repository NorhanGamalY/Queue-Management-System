'use client';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  const { t } = useTranslations();
  return (
    <>
    .
    <div className="container flex flex-wrap justify-center items-center  mx-auto">
        <div className="pt-5 text-center">
          <Image className='pt-5' src='/error.png' alt='error' width={577} height={453}/>
          <Link href="/" ><Button className="my-5 bg-[#359487] dark:bg-white">{t('notFound.button')}</Button> </Link> 
        </div>
    </div>
    
 
    </>
  )
}
