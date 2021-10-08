import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { DateContext } from './DateContext';
import { YearMonthContext } from './YearMonthContext.js';
import { format, addMonths, subMonths } from 'date-fns';
import $ from 'jquery';
import { calendarData, ModuleDefaults } from '../modules/calendarData';

const StyledMonth = styled.div`
    background-color: ${(props) => props.theme.khaki};
    color: ${(props) => props.theme.grey};
    //border: 2px solid ${(props) => props.theme.lemon};
    > ul {
        margin: 0;
        text-align: center;
        height: 4rem;
        font-size: 1.2rem;
        padding: 0;
        display: flex;
        flex-direction: row;
        list-style: none;
        justify-content: space-between;
        align-items: center;
        > .prev,
        .next {
            //background-color: yellow;
            color: ${(props) => props.theme.red};
            margin: 0 5px;
        }
        input[type='radio'] {
            display: none;
        }
        .month {
            display: flex;
            height: 90%;
            background-color: ${(props) => props.theme.khaki};
            flex-grow: 1;
            border-top: 2px solid ${(props) => props.theme.khaki};
            label {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                justify-content: center;
                .no-departure {
                    color: green;
                    font-size: 1rem;
                }
            }
        }
        .month input[type='radio']:checked + label {
            color: ${(props) => props.theme.red};
            background-color: white;
        }
    }
`;

function Month() {
    const [sharedMonth, setSharedMonth] = useContext(DateContext);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [departureMonth] = useContext(YearMonthContext);

    useEffect(() => {
        $('.month :input').eq(selectedMonth).prop('checked', true);
    }, [selectedMonth]);

    const prevMonth = () => {
        if (selectedMonth === 0) {
            setSharedMonth(subMonths(new Date(sharedMonth), 1));
            //ModuleDefaults.onClickPrev(prevMonth, sharedMonth);
            return null;
        }
        setSelectedMonth((prevSelectedMonth) => prevSelectedMonth - 1);
        setSharedMonth(subMonths(new Date(sharedMonth), 1));
    };

    const nextMonth = () => {
        if (selectedMonth === 2) {
            setSharedMonth(addMonths(new Date(sharedMonth), 1));
            //ModuleDefaults.onClickNext(nextMonth, sharedMonth);
            return null;
        }
        setSelectedMonth((prevSelectedMonth) => prevSelectedMonth + 1);
        setSharedMonth(addMonths(new Date(sharedMonth), 1));
    };

    const manualSelectMonth = (value) => {
        if (value < selectedMonth) {
            setSelectedMonth((prevSelectedMonth) => prevSelectedMonth - 1);
            setSharedMonth(subMonths(new Date(sharedMonth), 1));
            return null;
        }
        if (value > selectedMonth) {
            setSelectedMonth((prevSelectedMonth) => prevSelectedMonth + 1);
            setSharedMonth(addMonths(new Date(sharedMonth), 1));
            return null;
        }
    };

    //const currentMonth = new Date();
    //currentMonth:Thu Sep 30 2021 10:07:09 GMT+0800 (台北標準時間)
    //console.log('currentMonth', currentMonth);
    return (
        <StyledMonth>
            <ul>
                <li className="prev">
                    <input type="radio" id="prev" value="prev" />
                    <label htmlFor="prev" onClick={prevMonth}>
                        ◀
                    </label>
                </li>

                <li className="month current-month">
                    <input
                        type="radio"
                        value={0}
                        id={format(new Date(sharedMonth), 'Y M')}
                        name="month"
                    />
                    <label
                        htmlFor={format(new Date(sharedMonth), 'Y M')}
                        onClick={() => manualSelectMonth(0)}
                    >
                        {format(new Date(sharedMonth), 'Y M')}月
                        {departureMonth.includes(format(new Date(sharedMonth), 'YMM')) ? null : (
                            <div className="no-departure">無出發日</div>
                        )}
                        {/* selectedMonth{selectedMonth}
                        sharedMonth{sharedMonth} */}
                    </label>
                </li>
                <li className="month next-month">
                    <input
                        type="radio"
                        id={format(addMonths(new Date(sharedMonth), 1), 'Y M')}
                        name="month"
                        value={1}
                    />
                    <label
                        htmlFor={format(addMonths(new Date(sharedMonth), 1), 'Y M')}
                        onClick={() => manualSelectMonth(1)}
                    >
                        {format(addMonths(new Date(sharedMonth), 1), 'Y M')}月
                        {departureMonth.includes(
                            format(addMonths(new Date(sharedMonth), 1), 'YMM')
                        ) ? null : (
                            <div className="no-departure">無出發日</div>
                        )}
                    </label>
                </li>
                <li className="month next-month">
                    <input
                        type="radio"
                        id={format(addMonths(new Date(sharedMonth), 2), 'Y M')}
                        name="month"
                        value={2}
                    />
                    <label
                        htmlFor={format(addMonths(new Date(sharedMonth), 2), 'Y M')}
                        onClick={() => manualSelectMonth(2)}
                    >
                        {format(addMonths(new Date(sharedMonth), 2), 'Y M')}月
                        {departureMonth.includes(
                            format(addMonths(new Date(sharedMonth), 2), 'YMM')
                        ) ? null : (
                            <div className="no-departure">無出發日</div>
                        )}
                    </label>
                </li>

                <li className="next">
                    <input type="radio" id="next" />
                    <label htmlFor="next" onClick={nextMonth}>
                        ▶
                    </label>
                </li>
            </ul>
        </StyledMonth>
    );
}

export default Month;
