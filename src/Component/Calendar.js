import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { calendarData, ModuleDefaults } from '../modules/calendarData';
import { format, isSameMonth, isSameDay } from 'date-fns';
import WeekNames from './WeekNames';
import { DateContext } from './DateContext.js';
// import Travel from './Travel';
import { TravelContext } from './TravelContext.js';
import { YearMonthContext } from './YearMonthContext';

const StyledCalendar = styled.div`
    // background-color: lightpink;
    // border-bottom: 3px solid #335dff;
    .week {
        height: 6rem;
        backgroung-color: #ff8b33;
        //border: 3px solid #ff8b33;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .day {
            overflow: hidden;
            width: 14.28%;
            flex-grow: 1;
            border: 1px solid ${(props) => props.theme.khaki};
            .day-first {
                display: flex;
                flex-direction: row;
                .day-first-date {
                    justify-content: flex-start;
                }
            }
        }
        .diff-month {
            visibility: hidden;
        }
        .selected {
            background-color: ${(props) => props.theme.lemon};
            border: 2px solid ${(props) => props.theme.lime};
        }
    }
`;
const StyledTravel = styled.div`
    .first-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .guaranteed {
            background-color: ${(props) => props.theme.orange};
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            padding: 1px 4px;
        }
    }
    .second-row {
        color: ${(props) => props.theme.grey};
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .see-more {
        color: ${(props) => props.theme.blue};
    }
    .price {
        color: ${(props) => props.theme.red};
    }
    .reserve {
        color: ${(props) => props.theme.orange};
    }
    .close {
        color: ${(props) => props.theme.light};
    }
    .alternate {
        color: ${(props) => props.theme.green};
    }
    .show-row {
        //color: ${(props) => props.theme.grey};
        display: flex;
        flex-direction: column;
        .row-container {
            border-bottom: 3px solid ${(props) => props.theme.khaki};
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .selected {
            background-color: ${(props) => props.theme.lemon};
            border: 2px solid ${(props) => props.theme.lime};
        }
        .row-left-col {
            display: flex;
            flex-direction: row;
        }
        .row-left-col-repeat {
            display: flex;
            flex-direction: row;
        }

        .row-second-col {
            font-size: 1.2rem;
            display: flex;
            flex-direction: column;
        }
        .row-third-col {
            font-size: 1.2rem;
            display: flex;
            flex-direction: column;
            align-items: end;
        }

        .row-day {
            display: flex;
            flex-direction: column;
            font-size: 1.8rem;
            align-items: center;
            margin-left: 0.5rem;
            .row-weekday {
                font-size: 1.3rem;
            }
        }
        .row-guaranteed {
            background-color: ${(props) => props.theme.orange};
            color: white;
            margin: 1rem;
            border-radius: 15px;
            padding: 3px;
        }
        .row-availableVancancy {
            margin: 1rem 1rem;
            //background-color: purple;
        }
    }
`;

function Calendar(props) {
    //pass date relevant info to DateContext
    const [sharedMonth, setSharedMonth] = useContext(DateContext);
    //const [travel, setTravel] = useContext(TravelContext);
    const moduleEntry = new calendarData();
    const data = moduleEntry.takeMonth(new Date(sharedMonth))(); //Call the generator then call it
    const [travel, setTravel] = useContext(TravelContext);
    const [, setDepartureYearMonth] = useContext(YearMonthContext);
    const [repeat, setRepeat] = useState();

    function dayColor(day) {
        if (!isSameMonth(day, new Date(sharedMonth))) {
            return 'diff-month';
        }

        if (isSameDay(day, new Date(sharedMonth))) {
            return 'selected';
        }
    }
    useEffect(() => {
        async function getData() {
            await fetch(ModuleDefaults.dataSource)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    const renamed = moduleEntry.renameKeys(ModuleDefaults.dataKeySetting, data);
                    const sorted = moduleEntry.sortByDate(renamed);
                    //const removeSameDay = moduleEntry.removeSameDay(sorted);
                    setTravel(sorted);
                    const repeat = moduleEntry.repeatedDay(sorted);
                    setRepeat(repeat);
                    setDepartureYearMonth(moduleEntry.departureMonth(sorted));
                });
        }
        getData();
        // eslint-disable-next-line
    }, []);

    const travelStatus = (s) => {
        switch (s) {
            case '預定':
                return 'reserve';
            case '後補':
                return 'alternate';
            case '額滿':
                return 'close';
            case '截止':
                return 'close';
        }
    };
    /**
     * currency format
     */

    const currency = (price) => moduleEntry.currencyFormat(price);
    /**
     * calendar
     */
    const colFirstRow = (date) =>
        // eslint-disable-next-line
        travel.map((d) => {
            if (date === d.date) {
                if (repeat !== undefined) {
                    if (!repeat.includes(d.date)) {
                        return (
                            <div className="first-row" key={d.price}>
                                {d.guaranteed ? <span className="guaranteed">成行</span> : null}
                            </div>
                        );
                    }
                }
            }
        });
    const travelData = (date) =>
        // eslint-disable-next-line
        travel.map((d) => {
            if (date === d.date) {
                if (repeat !== undefined) {
                    if (repeat.includes(d.date)) {
                        return (
                            <div key={d.price}>
                                {colFirstRow(date)}
                                <div
                                    className="second-row"
                                    key={d.price}
                                    onClick={() => {
                                        ModuleDefaults.onClickDate(date, d);
                                    }}
                                >
                                    <span className="see-more">看更多團 ▶</span>
                                    <span className="availableVancancy">
                                        可賣: {d.availableVancancy}
                                    </span>
                                    <span className="totalVacnacy">席次: {d.totalVacnacy}</span>
                                    <span className="price">${currency(d.price)}</span>
                                </div>
                            </div>
                        );
                    }
                }

                return (
                    <div
                        className="second-row"
                        key={d.price}
                        onClick={() => {
                            ModuleDefaults.onClickDate(date, d);
                        }}
                    >
                        <span className={`${travelStatus(d.status)}`}>{d.status}</span>
                        <span className="availableVancancy">可賣: {d.availableVancancy}</span>
                        <span className="totalVacnacy">席次: {d.totalVacnacy}</span>
                        <span className="price">${currency(d.price)}</span>
                    </div>
                );
            }
        });

    /**
     * row
     */
    const rowTravelData = (date) =>
        // eslint-disable-next-line
        travel.map((d) => {
            if (date === d.date) {
                return (
                    <div className="row-third-col" key={d.price}>
                        <span className={`${travelStatus(d.status)}`}>{d.status}</span>
                        <span className="price">${currency(d.price)}</span>
                    </div>
                );
            }
        });
    const showRow = (date, day, color) =>
        // eslint-disable-next-line
        travel.map((d) => {
            if (date === d.date) {
                if (repeat !== undefined) {
                    if (repeat.includes(d.date)) {
                        return (
                            <div
                                className={`row-container ${color}`}
                                key={d.price}
                                onClick={() => {
                                    ModuleDefaults.onClickDate(day, d);
                                }}
                            >
                                <div className="row-left-col-repeat">
                                    <div className="row-first-col">
                                        <span className="row-day">
                                            <span>{day}</span>
                                            <span className="row-weekday">
                                                {moduleEntry.getDay(date)}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="row-second-col" key={d.price}>
                                        <span>
                                            <span className="availableVancancy row-availableVancancy">
                                                可賣: {d.availableVancancy}
                                            </span>
                                            <span className="totalVacnacy">
                                                席次: {d.totalVacnacy}
                                            </span>
                                        </span>
                                        <span>
                                            {d.guaranteed ? (
                                                <span className="row-guaranteed">成行</span>
                                            ) : null}
                                        </span>
                                    </div>
                                </div>
                                <div className="row-third-col" key={d.price}>
                                    <span className={`${travelStatus(d.status)}`}>{d.status}</span>
                                    <span className="price">${currency(d.price)}</span>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                className={`row-container ${color}`}
                                key={d.price}
                                onClick={() => {
                                    ModuleDefaults.onClickDate(day, d);
                                }}
                            >
                                <div className="row-left-col">
                                    <div className="row-first-col">
                                        <span className="row-day">
                                            <span>{day}</span>
                                            <span className="row-weekday">
                                                {moduleEntry.getDay(date)}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="row-second-col" key={d.price}>
                                        <span>
                                            <span className="availableVancancy row-availableVancancy">
                                                可賣: {d.availableVancancy}
                                            </span>
                                            <span className="totalVacnacy">
                                                席次: {d.totalVacnacy}
                                            </span>
                                        </span>
                                        <span>
                                            {d.guaranteed ? (
                                                <span className="row-guaranteed">成行</span>
                                            ) : null}
                                        </span>
                                    </div>
                                </div>
                                <div className="row-third-col">{rowTravelData(date)}</div>
                            </div>
                        );
                    }
                }
            }
        });

    return (
        <>
            {props.isToggle ? null : <WeekNames />}

            <StyledCalendar>
                {data.map((week) => (
                    <div className={props.isToggle ? null : 'week'} key={week}>
                        {
                            // eslint-disable-next-line
                            week.map((day) => {
                                if (props.isToggle) {
                                    return (
                                        <div
                                            onClick={() => {
                                                setSharedMonth(day);
                                                ModuleDefaults.onClickDate(day);
                                            }}
                                            // className={`day ${dayColor(day)}`}
                                            key={format(day, 'd')}
                                        >
                                            <StyledTravel>
                                                <div
                                                    className={
                                                        props.isToggle ? 'show-row' : 'first-row'
                                                    }
                                                    color={dayColor(day)}
                                                    key={format(day, 'd')}
                                                    day={format(day, 'd')}
                                                    date={format(day, 'yyyyMMdd')}
                                                >
                                                    {props.isToggle ? null : (
                                                        <span>{format(day, 'd')}</span>
                                                    )}
                                                    {props.isToggle
                                                        ? showRow(
                                                              format(day, 'yyyyMMdd'),
                                                              format(day, 'd'),
                                                              dayColor(day)
                                                          )
                                                        : null}
                                                </div>
                                                {props.isToggle
                                                    ? null
                                                    : travelData(format(day, 'yyyyMMdd'))}
                                            </StyledTravel>
                                        </div>
                                    );
                                }
                                if (!props.isToggle) {
                                    return (
                                        <div
                                            onClick={() => {
                                                setSharedMonth(day);
                                            }}
                                            className={`day ${dayColor(day)}`}
                                            key={format(day, 'd')}
                                        >
                                            <StyledTravel>
                                                <div
                                                    className={
                                                        props.isToggle ? 'show-row' : 'first-row'
                                                    }
                                                    key={format(day, 'd')}
                                                    day={format(day, 'd')}
                                                    date={format(day, 'yyyyMMdd')}
                                                >
                                                    {props.isToggle ? null : (
                                                        <span>{format(day, 'd')}</span>
                                                    )}
                                                    {props.isToggle
                                                        ? null
                                                        : colFirstRow(format(day, 'yyyyMMdd'))}
                                                </div>
                                                {props.isToggle
                                                    ? null
                                                    : travelData(format(day, 'yyyyMMdd'))}
                                            </StyledTravel>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                ))}
            </StyledCalendar>
        </>
    );
}

export default Calendar;
