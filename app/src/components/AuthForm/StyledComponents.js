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

export {
    FormActions,
    Input,
    Label,
    FormItem,
    FormRoot,
};