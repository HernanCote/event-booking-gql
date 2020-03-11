import React from 'react';

import AuthForm from '../../components/AuthForm';

const AuthIndex = () => {
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
            console.log('Successful request', data);
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