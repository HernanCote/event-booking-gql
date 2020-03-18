import styled from 'styled-components'

const Button = styled.button`
    background: #172839;
    font: inherit;
    border: 1px solid #172839;
    border-radius: 0.2rem;
    padding: 0.3rem 1rem;
    margin-right: 1rem;
    color: #fff;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.26);
    cursor: pointer;
    outline: none;

    :hover, :active {
        background: #17286A;
    }
`;

export {
    Button,
};