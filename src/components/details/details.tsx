import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Drawer, theme } from 'antd';
import { Link } from 'react-router-dom';
import CreateNewSlot from '../createNewSlot/createNewSlot';
import { localDB } from '../../config/localdb';
import { useLiveQuery } from 'dexie-react-hooks';

import { doctorsMock } from '../../mocks/doctors'
import profileImg from '../../assets/profile.png'

export interface Props {
    id?: string
}


interface DocsProps {
    slots: Array<[]>
}

interface StateOBJ {
    docs: DocsProps
}

export default function Details({ id }: Props) {

    const existingslots = useLiveQuery(
        () => localDB.table("slots").toArray()
    );

    const sortedTime = existingslots?.sort(function (a, b) {
        return a.startTime.localeCompare(b.startTime);
    });

    const filterSlots = sortedTime?.filter(d => d.docId === id)


    const [open, setOpen] = useState(false);

    const filterDoc = doctorsMock.filter(doc => doc.doctorId === id);
    const doc = filterDoc.length > 0 ? filterDoc[0] : null


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    return (
        <div className='md:w-4/6 mx-auto'>

            <div>
                <Link to={"/"} className='text-primary font-semibold'>  {"<<"} Go back</Link>
            </div>
            {
                doc ? <div className='flex flex-col gap-4 mt-10'>
                    <div className='md:flex gap-5 shadow rounded-md border-b-4 border-primary'>

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

                    </div>
                    <div className='shadow-md w-full p-3 rounded-md py-10 border border-primary'>
                        <div className='flex'>
                            <h2 className='text-primary font-semibold text-md'>Available Slots:</h2>
                            <div className='ml-auto'>
                                <button onClick={showDrawer} className='bg-red-400 text-white rounded px-5 p-2 text-sm font-semibold hover:bg-red-400/70'>Create new slot</button>
                            </div>
                        </div>
                        <div className='mt-10'>
                            {filterSlots && filterSlots.length > 0 ?<div className='flex md:flex-row flex-col gap-5'>
                                {
                                    filterSlots.map(slot => {
                                        return <div  className='bg-secondary/10 text-primary text-sm p-2 rounded-md'>
                                            <div>{slot.startTime} - {slot.endTime}</div>
                                        </div>
                                    })
                                }
                            </div> : <></>}
                        </div>
                    </div>
                </div> : <div>No doctors available in this id</div>
            }
            <Drawer
                title="Create new slot"
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
                getContainer={false}
                
            >
                <div>
                    <CreateNewSlot id={id} onClose={() =>setOpen(false)} />
                </div>
            </Drawer>
        </div>
    )
}
