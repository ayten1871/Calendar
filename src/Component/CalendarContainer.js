import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import Month from './Month';
import { DateContext } from './DateContext';
import { calendarData } from '../modules/calendarData';
import $ from 'jquery';

const StyleCalendar = styled.div`
    .toggle {
        color: ${(props) => props.theme.blue};
        font-weight: bold;
        display: flex;
        flex-diretion: row;
        justify-content: flex-start;
    }
    toggle::before {
        content: '≡';
        font-size: 1.3rem;
    }
`;

function CalendarContainer() {
    const moduleEntry = new calendarData($('.calendarContainer'));
    const [, setCurrentMonth] = useState(moduleEntry.getInitYearMonth());
    const [isToggle, setIsToggle] = useState(false);
    const [, setSharedMonth] = useContext(DateContext);

    useEffect(() => {
        setCurrentMonth(`${moduleEntry.getInitYearMonth()}`);
        setSharedMonth(`${moduleEntry.getInitYearMonth()}`);
        // eslint-disable-next-line
    }, []);

    return (
        <StyleCalendar className="calendarContainer">
            <div
                className="toggle"
                onClick={() => {
                    setIsToggle(!isToggle);
                }}
            >
                {isToggle ? '📅' : '≡'}切換列表顯示
            </div>
            <Month />
            <Calendar isToggle={isToggle} />
        </StyleCalendar>
    );
}
export default CalendarContainer;
