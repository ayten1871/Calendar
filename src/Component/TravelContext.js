import React from 'react';
import { useState, createContext } from 'react';
import { calendarData } from '../modules/calendarData';

export const TravelContext = createContext();

export const TravelProvider = (props) => {
    const moduleEntry = new calendarData();
    const [travel, setTravel] = useState(moduleEntry.getTravel());

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <TravelContext.Provider value={[travel, setTravel]}>
            {props.children}
            {/*To whatever child between these*/}
        </TravelContext.Provider>
    );
};

/**
 * ?context API & useMemo
 * *https://ithelp.ithome.com.tw/articles/10249827
 */
