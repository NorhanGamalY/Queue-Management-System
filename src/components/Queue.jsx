import React from 'react';
import { Spinner } from "flowbite-react";
import { LuUsers } from "react-icons/lu";

const Queue = async ({index}) => {
    const res = await fetch('http://localhost:3001/data');
    const data = await res.json();
    if(data.length === 0) return <Spinner color="success" aria-label="Success spinner example" />
    return (
        <div>
            <div className='flex justify-between'>
                <p className='flex items-center'>
                    <span className='me-1'><LuUsers /></span>
                    {data[index].queue.current} / {data[index].queue.max} in queue
                </p>
                <p>{data[index].queue.waitTime} wait</p>
            </div>
            <div className='bg-gray-300 w-full rounded-2xl mt-3'>
                <div className='bg-[#359487] w-1/4 h-2 rounded-2xl'></div>
            </div>
        </div>
    );
}

export default Queue;
