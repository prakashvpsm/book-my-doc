import React from 'react'
import { CarryOutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import profileImg from '../../assets/profile.png'


export interface Props {
    doctors: Array<{
        doctorId: string,
        name: string,
        department: string,
        departmentCode: string,
        workingHospital: string,
        exp: string,
        languages: Array<string>

    }>
}

interface DocsProps{
    filters: Array<{
        gender:string,
        department:string
    }>
}

interface StateOBJ{
    docs : DocsProps
}

export default function Doctors({ doctors }: Props) {
    
    const existingFilters = useSelector((state:StateOBJ) => state?.docs?.filters);

    const filteredDocs = Object.keys(existingFilters).length > 0 && doctors?.length > 0 ? doctors.filter(doc => {
        return Object.keys(existingFilters).every((k) => existingFilters[k as keyof object] === doc[k as keyof object] )
    }): doctors


    return (
        <div>
            <div className='flex flex-col gap-10  w-full '>
                {
                    filteredDocs?.map(doc => {
                        return <div className='md:flex gap-5  shadow rounded-md border-b-4 border-primary'>
                            <div className='bg-secondary/20 rounded-md p-3 relative'>

                                <img className='w-24 h-24 z-10' src={profileImg} alt="profile" />
                            </div>
                            <div className='flex flex-col gap-5 p-3'>
                                <div className='flex flex-col gap-2'>
                                    <div className='font-semibold'>{doc.name}</div>
                                    <div className='flex gap-2 items-center text-secondary text-xs'>
                                        <div>{doc.department}</div>
                                        <div className='h-3 w-px bg-gray-300'></div>
                                        <div>{doc.exp} years</div>
                                    </div>
                                </div>
                                <div className='w-full mx-auto border-b border-gray-300'></div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-2 text-xs'><span className='text-primary font-semibold'>Languages known :</span> {doc.languages?.map(lang => <div>{lang}</div>)}</div>
                                    <div className='text-xs'><span className='text-primary font-semibold'>Current Hospital : </span>{doc.workingHospital}</div>
                                </div>
                            </div>
                            <div className='flex items-center justify-center p-3 ml-auto'>
                                    <Link to={`/${doc.doctorId}`} className='bg-primary text-white flex gap-3 justify-center items-center px-4 py-2 rounded-md hover:bg-primary/40'>
                                    <CarryOutOutlined  className='text-white text-xl -mt-1'/>
                                        <p>Book an appointment</p>
                                        </Link>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
