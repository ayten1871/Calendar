import React from 'react';
import styled from 'styled-components';
import CalendarContainer from './CalendarContainer';

const StyleContainer = styled.div`
    //background-color: #ffe833;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //text-align: center;
    // max-width: 50%;
`;

function Container() {
    return (
        <StyleContainer>
            <CalendarContainer />
        </StyleContainer>
    );
}

export default Container;
