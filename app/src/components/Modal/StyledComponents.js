import styled from 'styled-components';

import { H1 } from '../Foundation';

const Root = styled.div`
    z-index: 100;
    width: 90%;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    position: fixed;
    top: 20vh;
    left: 5%;

    @media (min-width: 768px) {
        --modal-width: 30rem;
        width: var(--modal-width);
        left: calc((100% - var(--modal-width)) / 2);
    }
`;

const Title = styled.header`
    padding: 1rem;
    background: #172839;
    color: #fff;

    ${H1} {
        margin: 0;
        font-size: 1.25rem;
    }
`;


const Content = styled.section`
    padding: 1rem;
`;

const Actions = styled.section`
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
`;

export {
    Root,
    Title,
    Content,
    Actions,
};