import React, { useContext } from 'react';

import AuthForm from '../../components/AuthForm';
import authContext from '../../context/auth-context';

const AuthIndex = () => {

    const contextType = useContext(authContext);

    const submitHandler = async ({ email, password, isLogin }) => {

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
        };

        if (!isLogin) {
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${email}", password: "${password}"}) {
                            _id
                            email
                        }
                    }
                `
            };
        }

        try {
            const response = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed');
            }
            const { data, errors } = await response.json();
            if (errors) {
                throw new Error(errors[0].message);
            }
            const { token, userId, tokenExpiration } = data.login;
            if (token) {
                contextType.login(token, userId, tokenExpiration);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <AuthForm onSubmitHandler={submitHandler} />
        </>

    );
};

export default AuthIndex;