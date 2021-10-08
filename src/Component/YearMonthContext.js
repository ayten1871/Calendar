import React from 'react';
import { useState, createContext, useContext } from 'react';
import { calendarData } from '../modules/calendarData';
import { TravelContext } from './TravelContext.js';

export const YearMonthContext = createContext();

export const YearMonthProvider = (props) => {
    const moduleEntry = new calendarData();
    const [travel] = useContext(TravelContext);
    const [departureMonth, setDepartureMonth] = useState(moduleEntry.departureMonth(travel));

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <YearMonthContext.Provider value={[departureMonth, setDepartureMonth]}>
            {props.children}
            {/*To whatever child between these*/}
        </YearMonthContext.Provider>
    );
};
