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
        <div className='border border-gray-300 rounded-2xl px-5 py-5 bg-white dark:bg-[#2b2825] w-full w-max-[400px] mx-auto'>
            <div className='flex justify-between'>
                <NameLocation index={index}/>
                <Category index={index}/>
            </div>
            <div className="my-3"><Rating index={index}/></div>
            <ShiftServices index={index}/>
            <div className='mt-3'><Queue index={index}/></div>
            <div className='flex items-center'>
                <Button className="my-5 w-[85%] me-4 bg-[#359487] dark:bg-white">Book Now</Button>
                <span className='flex justify-center w-[15%] my-5 py-2 rounded-[5px] border border-gray-300'><FaArrowRight/></span>
            </div>
        </div>
    );
}

export default Card;
