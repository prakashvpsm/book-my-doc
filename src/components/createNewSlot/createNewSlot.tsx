import React, { useState, useEffect } from 'react'
import { TimePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { localDB } from '../../config/localdb';
import { useLiveQuery } from 'dexie-react-hooks';
import { checkIfThetimeIsbetweenTwo, calculateTimeInterval } from '../../utils';
import moment from "moment";
import dayjs from 'dayjs';

export interface Props {
    id?: string,
    onClose?: () => void
}

export default function CreateNewSlot({ id, onClose }: Props) {

    const [error, setError] = useState<any>();
    const [recommended, setRecommendSlots] = useState({});
    const [selectedSlots, setSlots] = useState({});
    const [loading, setLoading] = useState<boolean>(false);


    const existingslots = useLiveQuery(
        () => localDB.table("slots").toArray()
    );

    useEffect(() => {

    }, [])


    const getTimeRange = (dayjsObj: any, formatString: Array<string>) => {

        const difference = dayjsObj[1].diff(dayjsObj[0]);

        setSlots({})
        setError(null)

        if (existingslots && existingslots?.length > 0) {
            const sortedTime = existingslots.sort(function (a, b) {
                return a.startTime.localeCompare(b.startTime);
            });
            const ifExists = existingslots.find(slot => checkIfThetimeIsbetweenTwo(formatString[0], slot?.startTime, slot?.endTime))

            if (ifExists) {
                const firstSlotTime = sortedTime[0].startTime;
                const endSlotTime = sortedTime[sortedTime.length - 1].endTime;

                setError('Select another time slot. This current slot have conflict with other time slots')
            } else {
                setSlots(prev => {
                    return {
                        ...prev,
                        startTime: formatString[0],
                        endTime: formatString[1],
                        docId: id
                    }
                })
            }
        }

        // const timeDifference = dayjsObj[1].diff(dayjsObj[0]);




        console.log(dayjsObj[1].diff(dayjsObj[0], 'minute'), 'ipasas')




        // addSlots({
        //     startTime: formatString[0],
        //     endTime: formatString[1],
        //     docId: id
        // })

        // console.log(reformatstring, 'time')

    }

    const addSlots = async (data: object) => {
        setLoading(true)
        const res = await localDB.table("slots").add({ ...data })
        if(res){
            setSlots({})
            if(onClose){
                onClose()
            }
        }
        setLoading(false)
    }

    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
        if (type === 'start') {
            return {
                disabledHours: () => range(0, 60).splice(0, 9),
                // disabledMinutes: () => {
                //     return range(30, 60)
                // },
            };
        }
        return {
            disabledHours: () => {
                return range(0, 60).splice(20, 4)
            },
            //   disabledMinutes: () => range(0, 31),
        };
    };

    const createSlot = () => {
        addSlots(selectedSlots)
    }
    return (
        <div>
            <div className='flex flex-col gap-5'>
                <h6 className='font-semibold'>Select time range</h6>
                <div>
                    <TimePicker.RangePicker disabledTime={disabledRangeTime} onChange={getTimeRange} order={true} format="hh:mm A" />
                </div>
                <div>
                    {
                        error ? <div className='text-red-600 text-sm'>{error}</div> : <></>
                    }
                </div>
                <div className='ml-auto mt-10'>
                    <button onClick={createSlot} disabled={Object.keys(selectedSlots).length > 0 ? false : true} className='bg-primary px-8 py-2 rounded-md text-white'>Create new slot</button>
                </div>
            </div>
        </div>
    )
}
