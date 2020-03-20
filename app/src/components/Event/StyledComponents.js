import styled from 'styled-components';

import {
    H2,
    H3,
    P,
} from '../Foundation';

const Root = styled.li`
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #172839;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${H2} {
        font-size: 1.5rem;
        color: #172839;
    }

    ${H3} {
        color: #7c7c7c;
    }

    ${P} {
        margin: 0;
    }
`;

const Content = styled.div``;

const Actions = styled.div``;

export {
    Root,
    Content,
    Actions,
};