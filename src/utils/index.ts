import moment from "moment";

export function calculateTimeInterval(startValue: string, endValue: string) {
    var a = moment([startValue]);//now
    var b = moment([endValue]);

    console.log(a.diff(b, 'minutes')) // 44700
    console.log(a.diff(b, 'hours')) // 745
    console.log(a.diff(b, 'days')) // 31
    console.log(a.diff(b, 'weeks')) // 4
}
export const checkIfThetimeIsbetweenTwo = (selectedTime: string, startTime: string, endTime: string) => {

    var selectedTimeSeconds = changeTime(selectedTime);
    var startTimeSeconds = changeTime(startTime);
    var endTimeSeconds = changeTime(endTime);

    var selectedTimeSecondsParsed = hmsToSecondsOnly(selectedTimeSeconds) //pass to convert to seconds function
    var startTimeSecondsParsed = hmsToSecondsOnly(startTimeSeconds)
    var endTimeSecondssParsed = hmsToSecondsOnly(endTimeSeconds)

    console.log(selectedTimeSecondsParsed, 'kka')
    console.log(startTimeSecondsParsed, 'saa')
    console.log(endTimeSecondssParsed, 'aksja')

    /* need logic to convert time to Date Format */

    if (selectedTimeSecondsParsed >= startTimeSecondsParsed && selectedTimeSecondsParsed <= endTimeSecondssParsed) { //if its between
        return true
    } else {
        return false
    }
}



function changeTime(time: string) {
    var thisTime;
    var thisHour = +time.substring(0, 2);
    if (time.substring(6, 8) == 'PM') {
        //add 12 hours to make it 24 hour clock
        thisHour += 12;
    }

    return thisHour + time.substring(2, 5)
}

function hmsToSecondsOnly(str: any) {
    var p = str?.split(':'),
        s = 0,
        m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}



// function parseTime(s) {
//     var c = s.split(':');
//     return parseInt(c[0]) * 60 + parseInt(c[1]);
// }

// function convertHours(mins:any) {
//     var hour = Math.floor(mins / 60);
//     mins = mins % 60;
//     var converted = pad(hour, 2) + ':' + pad(mins, 2);
//     return converted;
// }

// function pad(str:any, max:any) {
//     str = str.toString();
//     return str.length < max ? pad("0" + str, max) : str;
// }

// function calculate_time_slot(start_time:any, end_time:string, interval:string) {
//     var i, formatted_time;
//     var time_slots = new Array();
//     for (var i = start_time; i <= end_time; i = i + interval) {
//         formatted_time = convertHours(i);
//         time_slots.push(formatted_time);
//     }
//     return time_slots;
// }

// export const getTimeSlot = (start_time:string, end_time:string, interval:string) => {

//     var times_ara = calculate_time_slot(start_time, end_time, interval);
 
//     console.log(times_ara);
// }


