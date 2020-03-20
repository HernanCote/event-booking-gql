import React from 'react';
import styled from 'styled-components';

import './Spinner.css';

const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Spinner = ({
    className,
}) => (
        <Root className={className}>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </Root>
    );

export default Spinner;