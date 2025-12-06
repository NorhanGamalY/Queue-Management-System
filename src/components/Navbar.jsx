"use client";
import { useTranslations } from '@/hooks/useTranslations';
import { Popover } from "flowbite-react";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiLogOut } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';


export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const { t } = useTranslations();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/auth/me', {
          credentials: 'include', // Send HTTP-only cookies automatically
        });
        const data = await res.json();
        setUserData(data.data);
        setIsAuthenticated(res.ok);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathName]);

  // Hide navbar only on login/register pages
  if(pathName === '/login' || 
     pathName === '/login/businessregister' || 
     pathName === '/login/customerregister' || 
     pathName === '/login/forgot-password') {
    return null;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setIsAuthenticated(false);
        router.push('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-[#221F1B]/95 backdrop-blur-sm shadow-sm flex justify-between min-h-20 items-center px-6">

        <Link href="/" >
          <h1 className='text-[#359487] dark:text-[#C6FE02] font-bold text-xl md:text-2xl'>
            QuickQueue
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex justify-between items-center gap-3">
            <ul className='flex me-5 text-[17px] cursor-pointer'>
              <Link href="/"><li className='hover:text-[#359487] dark:hover:text-[#C6FE02]'>{t('nav.home')}</li></Link>
              <Link href="/about"><li className='mx-5 hover:text-[#359487] dark:hover:text-[#C6FE02]'>{t('nav.about')}</li></Link>
              <Link href="/contact"><li className='hover:text-[#359487] dark:hover:text-[#C6FE02]'>{t('nav.contact')}</li></Link>
            </ul>

            {!loading && (
              isAuthenticated ? (
                <div className='flex items-center gap-2'>
                  {/* <Button onClick={handleLogout} className="my-5 bg-[#359487] hover:bg-black dark:bg-[#C6FE02] dark:hover:bg-[#C6FE02]">
                    Logout <BiLogOut />
                  </Button> */}


                    
                     <div>
  <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
    Dropdown button 
    <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" /></svg>
  </button>
  <div id="dropdownInformation" className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-72">
    <div className="p-2">
      <div className="flex items-center px-2.5 p-2 space-x-1.5 text-sm bg-neutral-secondary-strong rounded">
        <img height="{8}" width="{8}" className="rounded-full" src="https://ui-avatars.com/api/?name=User&background=359487&color=fff" alt="User avatar" />
        <div className="text-sm">
          <div className="font-medium text-heading">Bonnie Green</div>
          <div className="truncate text-body">name@flowbite.com</div>
        </div>
        <span className="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded ms-auto">PRO</span>
      </div>
    </div>
    <ul className="px-2 pb-2 text-sm text-body font-medium" aria-labelledby="dropdownInformationButton">
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth={2} d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
          Account
        </a>
      </li>
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4" /></svg>
          Settings
        </a>
      </li>
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" /></svg>
          Privacy
        </a>
      </li>
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" /></svg>
          Notifications
        </a>
      </li>
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          Help center
        </a>
      </li>
      <li className="flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded mb-1.5">
        <a href="#" className="inline-flex items-center">
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" /></svg>
          Dark mode
        </a>
        <label className="inline-flex items-center cursor-pointer ms-auto">
          <input type="checkbox" defaultValue className="sr-only peer" />
          <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand" />
          <span className="ms-3 text-sm font-medium text-heading sr-only">Toggle me</span>
        </label>
      </li>
      <li className="border-t border-default-medium pt-1.5">
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z" /></svg>
          Upgrade to PRO
        </a>
      </li>
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 text-fg-danger hover:bg-neutral-tertiary-medium rounded">
          <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" /></svg>
          Sign out
        </a>
      </li>
    </ul>
  </div>
</div>




                  <Popover
                    aria-labelledby="profile-popover"
                    content={
                      <div className="w-48 p-3" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center gap-3">
                          <p id="profile-popover" className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                            {userData?.name}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Link 
                            href={
                              userData?.role === 'user' ? '/user' :
                              userData?.role === 'business' ? '/business' :
                              userData?.role === 'admin' ? '/adminDashboard' :
                              '/'
                            }
                            className="block w-full px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#359487] hover:text-white dark:hover:bg-[#C6FE02] dark:hover:text-gray-900 transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {t('nav.dashboard')}
                          </Link>
                        </div>
                        <div className="space-y-2">
                          <p
                            className="cursor-pointer block w-full px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#359487] hover:text-white dark:hover:bg-[#C6FE02] dark:hover:text-gray-900 transition-colors duration-200"
                            onClick={(e) => {
                              handleLogout()
                              e.stopPropagation();
                            }}
                          >
                            {t('nav.logout')}
                          </p>
                        </div>
                      </div>
                    }
                  >
                    <button className="cursor-pointer w-10 h-10 rounded-full overflow-hidden bg-gray-600 text-white flex items-center justify-center text-[18px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#359487]">
                      {userData?.image ? (
                        <img 
                          src={userData?.image} 
                          alt={userData?.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        userData?.name?.charAt(0).toUpperCase()
                      )}
                    </button>
                  </Popover>
                  {/* <p>{userData?.name || ''}</p> */}
                </div>
              ) : (
                <Link href="/login" >
                  <Button className="my-5 bg-[#359487] dark:bg-white">
                    {t('nav.login')} <FaArrowRight />
                  </Button>
                </Link>
              )
            )}
          </div>

            <LanguageSwitcher />
            <ThemeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-base hover:bg-neutral-tertiary hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary md:hidden"
          >
            <span className="sr-only">Open main menu</span>

            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden w-full">
          <ul className="flex flex-col font-medium mt-4 pt-4 bg-neutral-secondary-soft space-y-2 border-t border-default px-4 pb-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <li className='py-2 text-heading hover:text-[#359487] dark:hover:text-[#C6FE02]'>{t('nav.home')}</li>
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              <li className='py-2 text-heading hover:text-[#359487] dark:hover:text-[#C6FE02]'>{t('nav.about')}</li>
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <li className='py-2 text-heading hover:text-[#359487] dark:hover:text-[#C6FE02]'>{t('nav.contact')}</li>
            </Link>

            {!loading && (
              isAuthenticated ? (
                <Button onClick={() => { handleLogout(); setIsOpen(false); }} className="my-3 w-full bg-red-500 hover:bg-red-600 flex justify-center">
                  {t('nav.logout')} <BiLogOut />
                </Button>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="my-3 w-full bg-[#359487] dark:bg-white flex justify-center">
                    {t('nav.login')} <FaArrowRight />
                  </Button>
                </Link>
              )
            )}
          </ul>
        </div>
      )}
    </>
  )
}
