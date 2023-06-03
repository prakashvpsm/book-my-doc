import React from 'react';
import Filters from '../components/filters/filters';
import Doctors from '../components/docs/doctors';
import { doctorsMock } from '../mocks/doctors';

export default function Home() {
    return (
        <div className='w-full'>
            <div className='md:flex  gap-5'>
                <div className='md:w-4/12'>
                    <Filters />
                </div>
                <div className=''>
                    <Doctors doctors={doctorsMock} />
                </div>
            </div>
        </div>
    )
}
