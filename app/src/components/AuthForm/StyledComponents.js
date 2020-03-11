import styled from 'styled-components';

const FormRoot = styled.form`
    width: 25em;
    max-width: 80%;
    margin: 5rem auto;
`;

const FormItem = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    width: 100%;
    display: block;
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    width: 100%;
    display: block;
    padding: 0.5rem;
    border-radius: 0.25rem;
    outline: none;
    font-size: 1rem;
`;

const FormActions = styled.div``;

const FormButton = styled.button`
    background: #172839;
    font: inherit;
    border: 1px solid #172839;
    border-radius: 0.2rem;
    padding: 0.3rem 1rem;
    margin-right: 1rem;
    color: #EDE387;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.26);
    cursor: pointer;
    outline: none;

    :hover, :active {
        background: #17286A;
    }
`;

export {
    FormButton,
    FormActions,
    Input,
    Label,
    FormItem,
    FormRoot,
};