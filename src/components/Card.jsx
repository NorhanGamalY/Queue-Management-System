import React from 'react';
import { Button } from './ui/button';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { IoMdTime } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { v4 as uuid } from 'uuid';

const Card = ({ clinic }) => {
    if (!clinic) return null;

    // Format working hours
    const formatWorkingHours = () => {
        if (!clinic.workingHours || clinic.workingHours.length === 0) {
            return "Not specified";
        }
        const firstDay = clinic.workingHours[0];
        return `${firstDay.openTime} - ${firstDay.closeTime}`;
    };

    return (
        <div className='border border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-5 bg-white dark:bg-gray-900 w-full w-max-[400px] mx-auto shadow-sm dark:shadow-gray-600 hover:scale-105 transition-all duration-200 ease-in-out'>
            
            {/* Name and Location */}
            <div className='flex justify-between items-start mb-3'>
                <div className='flex-1'>
                    <h3 className='text-[20px] font-semibold text-gray-900 dark:text-white'>
                        {clinic.name}
                    </h3>
                    <p className='flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1'>
                        <span className='me-1 text-base'>
                            <CiLocationOn />
                        </span>
                        {clinic.address}
                    </p>
                </div>
                
                {/* Specialization Badge */}
                {clinic.specialization && (
                    <span className='bg-gray-200 dark:bg-gray-700 p-2 px-3 rounded-2xl font-bold text-[11px] text-gray-800 dark:text-gray-200 uppercase tracking-wide'>
                        {clinic.specialization}
                    </span>
                )}
            </div>

            {/* Score if from search */}
            {clinic.score && (
                <div className='mb-3'>
                    <p className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                        <span className='me-1'><FaStar color='#f8f82f'/></span>
                        Match: {(clinic.score * 100).toFixed(0)}%
                    </p>
                </div>
            )}

            {/* Working Hours */}
            <p className='flex items-center mb-3 text-gray-700 dark:text-gray-300 font-medium'>
                <span className='me-2 text-lg'>
                    <IoMdTime/>
                </span>
                {formatWorkingHours()}
            </p>

            {/* Services */}
            {clinic.service && clinic.service.length > 0 && (
                <div className='flex flex-wrap gap-2 mb-3'>
                    {clinic.service.slice(0, 3).map(s => (
                        <p 
                            className='border border-gray-300 dark:border-gray-600 py-1 px-3 rounded-2xl text-[14px] w-fit bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300' 
                            key={uuid()}
                        >
                            {s.name}
                        </p>
                    ))}
                </div>
            )}

            {/* Queue Settings */}
            {clinic.queueSettings && clinic.queueSettings.length > 0 && (
                <div className='mt-3 mb-3'>
                    <div className='flex justify-between text-sm'>
                        <p className='flex items-center text-gray-700 dark:text-gray-300 font-medium'>
                            <span className='me-2 text-base'>
                                <LuUsers />
                            </span>
                            Max capacity: 
                            <span className='ml-1 text-gray-900 dark:text-white font-semibold'>
                                {clinic.queueSettings[0].maxPatientsPerDay}
                            </span>
                            <span className='ml-1 text-gray-600 dark:text-gray-400'>per day</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Contact */}
            {clinic.mobilePhone && (
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                    📱 {clinic.mobilePhone}
                </p>
            )}

            {/* Action Buttons */}
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