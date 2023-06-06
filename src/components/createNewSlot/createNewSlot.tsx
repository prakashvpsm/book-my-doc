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

export interface RecommendedArray {
    startTime?: string,
    endTime?: string,
}
export default function CreateNewSlot({ id, onClose }: Props) {

    const [error, setError] = useState<any>();
    const [recommended, setRecommendSlots] = useState<Array<RecommendedArray>>([]);
    const [selectedSlots, setSlots] = useState({});
    const [selectedFromSuggestion, setSuggestionSelect] = useState<number>();

    const [loading, setLoading] = useState<boolean>(false);


    const existingslots = useLiveQuery(
        () => localDB.table("slots").toArray()
    );

    useEffect(() => {

    }, [])


    const getTimeRange = (dayjsObj: any, formatString: Array<string>) => {

        const difference = dayjsObj[1].diff(dayjsObj[0], 'minute');

        setSlots({})
        setError(null)

        if (existingslots && existingslots?.length > 0) {
            //sort
            const sortedTime = existingslots.sort(function (a, b) {
                return a.startTime.localeCompare(b.startTime);
            });

            const ifExists = existingslots.find(slot => checkIfThetimeIsbetweenTwo(formatString[0], slot?.startTime, slot?.endTime))
            const isStartTimeConflicts = sortedTime.find(slt => {
                const selectedTime = moment(formatString[0], 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                const sltStartSeconds = moment(slt.startTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                const sltEndSeconds = moment(slt.endTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                if (selectedTime >= sltStartSeconds && selectedTime <= sltEndSeconds) {
                    return true
                } else {
                    return false
                }
            });
            
            const isEndTimeConflicts = sortedTime.find(slt => {
                const selectedTime = moment(formatString[1], 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                const sltStartSeconds = moment(slt.startTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                const sltEndSeconds = moment(slt.endTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                if (selectedTime >= sltStartSeconds && selectedTime <= sltEndSeconds) {
                    return true
                } else {
                    return false
                }
            });

            if (isStartTimeConflicts || isEndTimeConflicts) {

                const firstSlotTime = sortedTime[0].endTime;
                console.log(difference, 'diif')
                console.log(moment(firstSlotTime, 'hh:mm A').add(difference, 'minutes').format('hh:mm A'))
                const endSlotTime = sortedTime[sortedTime.length - 1].endTime;

                const suggSlot: Array<object> = []

                sortedTime.forEach((slot) => {
                    const newStartTime = moment(slot.endTime, 'hh:mm A').add(1, 'minutes').format('hh:mm A');
                    const newEndTime = moment(newStartTime, 'hh:mm A').add(difference, 'minutes').format('hh:mm A');

                    const newStartTimeToSeconds = moment(newStartTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                    const newEndTimeToSeconds = moment(newEndTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');

                    const isStartTimeConflicting = sortedTime.find(slt => {
                        const sltStartSeconds = moment(slt.startTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                        const sltEndSeconds = moment(slt.endTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                        if (newStartTimeToSeconds >= sltStartSeconds && newStartTimeToSeconds <= sltEndSeconds) {
                            return true
                        } else {
                            return false
                        }
                    });
                    const isEndTimeConflicting = sortedTime.find(slt => {
                        const sltStartSeconds = moment(slt.startTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                        const sltEndSeconds = moment(slt.endTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
                        if (newEndTimeToSeconds >= sltStartSeconds && newEndTimeToSeconds <= sltEndSeconds) {
                            return true
                        } else {
                            return false
                        }
                    });
                    console.log(isStartTimeConflicting, isEndTimeConflicting, 'strtt', newStartTime, newEndTime, '|', slot)
                    if (isStartTimeConflicting === undefined && isEndTimeConflicting === undefined) {
                        suggSlot.push({
                            startTime: newStartTime,
                            endTime: newEndTime,
                            docId: id
                        })
                    }
                })

                setRecommendSlots(suggSlot)

                console.log(firstSlotTime, 'firstslottim')

                setError('This current slot have conflict with other time slots. You may choose below time slot or select another time slot from picker ')
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
        if (res) {
            setSlots({})
            if (onClose) {
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
        if (selectedFromSuggestion) {
            addSlots(recommended[selectedFromSuggestion - 5])

        } else {
            addSlots(selectedSlots)
        }
    }
    return (
        <div>
            <div className='flex flex-col gap-5'>
                <h6 className='font-semibold'>Select time range</h6>
                <div>
                    <TimePicker.RangePicker disabledTime={disabledRangeTime} onChange={getTimeRange} order={true} format="hh:mm A" />
                </div>
                <div className='flex flex-col gap-4'>
                    {
                        error ? <div className='text-red-600 text-sm'>{error}</div> : <></>
                    }
                    {
                        recommended && recommended.length > 0 ? <div className='w-full flex flex-col gap-3'>
                            <div className='font-bold'>Suggestions:</div>
                            {
                                recommended?.map((r, i) => {
                                    return <div onClick={() => setSuggestionSelect(i + 5)} className={`cursor-pointer p-2 shadow px-3 rounded-md  ${selectedFromSuggestion === i + 5 ? 'bg-secondary/40' : 'bg-secondary/5'}`}>{r?.startTime} - {r?.endTime}</div>
                                })
                            }
                        </div> : <></>
                    }
                </div>
                <div className='ml-auto mt-10'>
                    <button onClick={createSlot} disabled={Object.keys(selectedSlots).length > 0 || selectedFromSuggestion ? false : true} className={` px-8 py-2 rounded-md text-white ${Object.keys(selectedSlots).length > 0 || selectedFromSuggestion ? 'bg-primary' : 'bg-gray-400'}`}>Create new slot</button>
                </div>
            </div>
        </div>
    )
}
