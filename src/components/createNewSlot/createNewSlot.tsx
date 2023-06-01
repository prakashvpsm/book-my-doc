import React from 'react'
import { TimePicker } from 'antd';

export default function CreateNewSlot() {
    const getTimeRange = (time:any) => {
        console.log(time, 'time')
    }
    return (
        <div>
            <div className='flex flex-col gap-5'>
                <h6 className='font-semibold'>Select time range</h6>
                <div>
                    <TimePicker.RangePicker onChange={getTimeRange}/>
                </div>
            </div>
        </div>
    )
}
