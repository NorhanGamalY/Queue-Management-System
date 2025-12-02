"use client";

import React from 'react'
import {Button} from './ui/button'
import {FaSun, FaMoon} from "react-icons/fa"
import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';

export default function ThemeToggle() {
  const {theme, setTheme} = useTheme() 

  return (
    <div>
        <Button variant="outline" size='icon' className='rounded-full'
        onClick={()=> setTheme(theme === "light"? 'dark' : "light")}
        >
          <FaMoon className='absolute h-10 w-10 rotate-0 scale-100 dark:rotate-90 dark:scale-0'></FaMoon>
          <FaSun className='absolute h-10 w-10 rotate-90 scale-0 dark:rotate-0 dark:scale-100'></FaSun>
        </Button>
    </div>
  )
}
