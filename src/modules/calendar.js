import { startOfMonth, startOfWeek, startOfDay, endOfMonth, endOfWeek, addDays } from 'date-fns';

//the default date need to be changed later
export function takeWeek(start = new Date()) {
    let date = startOfWeek(startOfDay(start)); //initial date
    //To make a closure to keep the updated date
    return function () {
        //make an array with 7 blank
        //map throuht all blanks while do sth with index
        //addDays(startDate,amount)
        const week = [...Array(7)].map((_, i) => addDays(date, i));
        //update date to the first date that after the week
        date = addDays(week[6], 1);
        return week;
    };
}

export function takeMonth(start = new Date()) {
    let month = [];
    let date = start;

    function lastDayOfRange(range) {
        return range[range.length - 1][6];
    }

    return function () {
        const weekGenerator = takeWeek(startOfMonth(date));
        const endDate = startOfDay(endOfWeek(endOfMonth(date)));
        month.push(weekGenerator());

        while (lastDayOfRange(month) < endDate) {
            month.push(weekGenerator());
        }

        const range = month;
        month = [];
        date = addDays(lastDayOfRange(range), 1);

        return range;
    };
}
