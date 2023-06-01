import React from 'react';
import Filters from '../components/filters/filters';
import Doctors from '../components/docs/doctors';
import { doctorsMock } from '../mocks/doctors';

export default function Home() {
    return (
        <div className='w-full'>
            <div className='flex gap-5'>
                <div className='w-2/6'>
                    <Filters />
                </div>
                <div className=''>
                    <Doctors doctors={doctorsMock} />
                </div>
            </div>
        </div>
    )
}
