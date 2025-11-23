import React from 'react';
import { Spinner } from "flowbite-react";
import { IoMdTime } from "react-icons/io";
import { v4 as uuid } from 'uuid';

const ShiftServices = async ({index}) => {
    const res = await fetch('http://localhost:3001/data', {cache: 'force-cache'});
    const data = await res.json();
    if(data.length === 0) return <Spinner color="success" aria-label="Success spinner example" />
    return (
        <div>
            <p className='flex items-center mb-3'><span className='me-1'><IoMdTime/></span> {data[index].workingHours}</p>
            <div className='flex text-center'>{data[index].services.map(s => (<p className='border border-gray-300 me-2 py-1 px-2 rounded-2xl text-[14px] w-fit' key={uuid()}>{s}</p>))}</div>
        </div>
    );
}

export default ShiftServices;
