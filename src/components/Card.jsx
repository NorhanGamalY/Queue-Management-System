import React from 'react';
import NameLocation from './Name-Location';
import Rating from './Rating';
import ShiftServices from './Shift-Services';
import Category from './Category';
import { Button } from './ui/button';
import { FaArrowRight } from 'react-icons/fa';
import Queue from './Queue';

const Card = ({index}) => {
    return (
        <div className='border border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-5 bg-white dark:bg-gray-900 w-full w-max-[400px] mx-auto shadow-sm dark:shadow-gray-600 hover:scale-105 transition-all duration-200 ease-in-out'>
            <div className='flex justify-between'>
                <NameLocation index={index}/>
                <Category index={index}/>
            </div>
            <div className="my-3"><Rating index={index}/></div>
            <ShiftServices index={index}/>
            <div className='mt-3'><Queue index={index}/></div>
            <div className='flex items-center'>
                <Button className="my-5 w-[85%] me-4 bg-[#359487] hover:bg-[#2d7a6f] dark:hover:text-white dark:bg-[#C6FE02] dark:hover:bg-[#a3cd0a] dark:text-gray-900 font-semibold transition-colors">
                    Book Now
                </Button>
                <span className='flex justify-center items-center w-[15%] my-5 py-2 rounded-[5px] border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
                    <FaArrowRight/>
                </span>
            </div>
        </div>
    );
}

export default Card;