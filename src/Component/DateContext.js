import React from 'react';
import { useState, createContext } from 'react';
import { calendarData } from '../modules/calendarData';

export const DateContext = createContext();

export const DateProvider = (props) => {
    const moduleEntry = new calendarData();
    const [sharedMonth, setSharedMonth] = useState(moduleEntry.getInitYearMonth());
    console.log(sharedMonth);
    // const [sharedMonth, setSharedMonth] = useState(new Date()); //need to be changed later
    // const [date, setDate] = useState(new Date()); //need to be changed later
    return (
        // <TravelContext.Provider value={[travel, setTravel]}>
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <DateContext.Provider value={[sharedMonth, setSharedMonth]}>
            {props.children}
            {/*To whatever child between these*/}
        </DateContext.Provider>
    );
};
