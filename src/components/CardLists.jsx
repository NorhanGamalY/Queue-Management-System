import React from 'react';
import { Spinner } from "flowbite-react";
import Card from './Card';
import { v4 as uuid } from 'uuid';

const CardLists = async () => {
    const res = await fetch('http://localhost:3001/data');
    const data = await res.json();
    if(data.length === 0) return <Spinner color="success" aria-label="Success spinner example" />
    return (
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8 px-6 md:px-1 lg:px-6 '>
            {data.map((item, idx) => (
                <div key={uuid()}>
                    <Card index={idx}/>
                </div>
            ))}
        </div>
    );
}

export default CardLists;
