import React from 'react';
import styled from 'styled-components';

const StyledWeekNames = styled.div`
    color: ${(props) => props.theme.grey};
    font-weight: 900;
    > ul {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        list-style: none;
        justify-content: space-around;
    }
`;

function WeekNames() {
    return (
        <StyledWeekNames>
            <ul>
                <li>星期日</li>
                <li>星期一</li>
                <li>星期二</li>
                <li>星期三</li>
                <li>星期四</li>
                <li>星期五</li>
                <li>星期六</li>
            </ul>
        </StyledWeekNames>
    );
}

export default WeekNames;
