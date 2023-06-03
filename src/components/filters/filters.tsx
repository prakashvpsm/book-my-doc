import React from 'react'
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../state/reducers/docs';
import CalanderView from '../calander';

const filters = [
    {
        type: 'select',
        title: 'Department',
        dataKey: 'departmentCode',
        options: [
            {
                label: 'Orthopaedics',
                value: 'ORTHO'
            },
            {
                label: 'General Surgery',
                value: 'GENS'
            },
            {
                label: 'Pulmonology',
                value: 'PULM'
            }
        ]
    },
    {
        type: 'select',
        title: 'Gender',
        dataKey: 'gender',
        options: [
            {
                label: 'Male',
                value: 'male'
            },
            {
                label: 'Female',
                value: 'female'
            }
        ]
    }

]

export default function Filters() {


    const existingFilters = useSelector((state: any) => state?.docs?.filters);
    const dispatch = useDispatch();

    const handleChange = (type: string, value: string) => {
        dispatch(setFilters({
            ...existingFilters,
            [type]: value
        }))
    }

    const clearAll = () => {
        dispatch(setFilters({}))
    }

    return (
        <div className='flex flex-col gap-10 bg-gray-100/60 p-10 rounded-md shadow'>
            <div><h2 className='font-semibold text-xl'>Filters:</h2></div>
            <div>
                <div className='flex flex-col gap-5'>
                    {
                        filters?.map(filter => {
                            return <div className='flex flex-col gap-3'>
                                <h2 className='text-primary'>{filter.title}</h2>
                                <div>
                                    <Select
                                        className='w-5/6'
                                        // style={{ width: 120 }}
                                        onChange={(value) => handleChange(filter.dataKey, value)}
                                        options={filter.options}
                                        value={existingFilters[filter.dataKey]}
                                    />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className=''>
                <button onClick={clearAll} className='text-primary underline text-sm'>Clear All filters</button>
            </div>


            <div>
                <CalanderView />
            </div>

        </div>
    )
}
