import React from 'react';
import Container from './Component/Container';
import { TravelProvider } from './Component/TravelContext';
import { DateProvider } from './Component/DateContext';
import { YearMonthProvider } from './Component/YearMonthContext';

function App() {
    return (
        <DateProvider>
            <TravelProvider>
                <YearMonthProvider>
                    <div className="App">
                        <Container />
                    </div>
                </YearMonthProvider>
            </TravelProvider>
        </DateProvider>
    );
}

export default App;
