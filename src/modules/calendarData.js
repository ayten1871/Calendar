import { startOfMonth, startOfWeek, startOfDay, endOfMonth, endOfWeek, addDays } from 'date-fns';
// import * as data from '../json/data2.json';

/**
 * Props default value write here
 */
const ModuleDefaults = {
    dataSource: '../json/data2.json',
    initYearMonth: '201705',
    dataKeySetting: {
        // 保證出團
        certain: 'guaranteed',
        //日期
        date: 'date',
        // 價格
        price: 'price',
        //可賣團位
        onsell: 'availableVancancy',
        // 團位
        total: 'totalVacnacy',
        // 狀態
        state: 'status',
    },
    onClickPrev: function (btn, data) {
        console.log(btn, data);
    },
    // 點下一個月時
    onClickNext: function (btn, data) {
        console.log(btn, data);
    },
    // 點日期時
    onClickDate: function (date, data) {
        console.log(date, data);
    },
};

class calendarData {
    constructor($ele) {
        this.$ele = $ele; //className = calendarContainer
        // this.$day = $ele.find('.day'); //every day in calendar
        // this.$prev = $ele.find('.prev');
        // this.$next = $ele.find('.next');
        // this.$prevMonth = $ele.find('prev-month');
        // this.$currentMonth = $ele.find('current-month');
        // this.$nextMonth = $ele.find('next-month');
    }

    renameKeys(keysMap, dataArr) {
        return dataArr.map((obj) => {
            //Modify date format from YYYY/MM/DD to YYYYMMDD
            const d = new Date(obj.date);
            const year = d.getFullYear();
            const month = d.getMonth() + 1;
            const date = d.getDate();
            obj.date = `${year}${month < 10 ? `0${month}` : month}${date < 10 ? `0${date}` : date}`;
            //replace key names if listed in keyMaps
            return Object.keys(obj).reduce(
                (acc, key) => ({
                    ...acc,
                    ...{ [keysMap[key] || key]: obj[key] },
                }),
                {}
            );
        });
    }

    sortByDate(renamed) {
        return renamed.sort(function (a, b) {
            return a.date - b.date;
        });
    }

    removeSameDay(sorted) {
        let uniqueArray = [];
        let uniqueDate = [];
        let key = 'date';
        for (let i = 0; i < sorted.length; i++) {
            if (uniqueDate.indexOf(sorted[i][key]) === -1) {
                uniqueDate.push(sorted[i][key]);
                uniqueArray.push(sorted[i]);
            }
        }
        return uniqueArray;
    }
    repeatedDay(sorted) {
        let departureDay = [];
        let repeatDate = [];
        let key = 'date';
        // eslint-disable-next-line
        sorted.map((travel) => {
            departureDay.push(travel[key]);
        });
        for (let i = 0; i < departureDay.length; i++) {
            if (departureDay[i] == departureDay[i + 1]) {
                repeatDate.push(departureDay[i]);
            }
        }
        return repeatDate;
    }

    departureMonth(removeSameDay) {
        let departureTime = [];
        let key = 'date';

        for (let i = 0; i < removeSameDay.length; i++) {
            let departureYearMonth = removeSameDay[i][key].slice(0, 6);
            if (departureTime.indexOf(departureYearMonth) === -1) {
                departureTime.push(departureYearMonth);
            }
        }
        // console.log(departureTime);
        return departureTime;
    }

    getTravel() {
        let sortedData = [];
        async function getTravel() {
            const renameKeys = (keysMap, dataArr) => {
                return dataArr.map((obj) => {
                    //Modify date format from YYYY/MM/DD to YYYYMMDD
                    const d = new Date(obj.date);
                    const year = d.getFullYear();
                    const month = d.getMonth() + 1;
                    const date = d.getDate();
                    obj.date = `${year}${month < 10 ? `0${month}` : month}${
                        date < 10 ? `0${date}` : date
                    }`;
                    //replace key names if listed in keyMaps
                    return Object.keys(obj).reduce(
                        (acc, key) => ({
                            ...acc,
                            ...{ [keysMap[key] || key]: obj[key] },
                        }),
                        {}
                    );
                });
            };

            const sortByDate = (renamed) => {
                return renamed.sort(function (a, b) {
                    return a.date - b.date;
                });
            };
            let dataArr;
            await fetch('/json/data0.json')
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    //console.log(data);
                    dataArr = data;
                });
            const renamed = renameKeys(ModuleDefaults.dataKeySetting, dataArr);
            const sorted = sortByDate(renamed);
            //console.log('out of then', Array.isArray(sorted));
            //console.log('out of then', sorted);
            sortedData.push(sorted);
        }
        getTravel();
        return sortedData;
    }

    getInitYearMonth() {
        let initYearMonth = new Date(
            ModuleDefaults.initYearMonth.replace(/(\d{4})(\d{2})/g, '$1/$2')
        );
        return initYearMonth;
    }
    getDay(date) {
        let days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let slashed = date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1/$2/$3');
        let slashedDate = new Date(slashed);
        let dayName = days[slashedDate.getDay()];
        return dayName;
    }
    currencyFormat(price) {
        return new Intl.NumberFormat('zh-Hans', {
            // style: 'currency',
            // currency: 'TWD',
            minimumFractionDigits: 0,
        }).format(price);
    }
    takeMonth(start = new Date()) {
        let month = [];
        let date = start;

        function lastDayOfRange(range) {
            return range[range.length - 1][6];
        }
        function takeWeek(start = new Date()) {
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
}

export { calendarData, ModuleDefaults };
