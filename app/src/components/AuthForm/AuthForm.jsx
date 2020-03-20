import React, { useState } from 'react';

import { FormActions } from './StyledComponents';
import { Button } from '../Foundation';

import {
    FormRoot,
    FormItem,
    Input,
    Label,
} from '../Form';


const AuthForm = ({
    className,
    onSubmitHandler,
}) => {
    const [isLogin, setIsLogin] = useState(true);

    const emailEl = React.createRef();
    const passwordEl = React.createRef();

    const switchModeHandler = () => {
        setIsLogin(!isLogin);
    };

    const submitClicked = (e) => {
        e.preventDefault();
        const email = emailEl.current.value;
        const password = passwordEl.current.value;
        onSubmitHandler({ email, password, isLogin });
    }

    return (
        <FormRoot className={className} onSubmit={submitClicked}>
            <FormItem>
                <Label htmlFor="email">E-Mail</Label>
                <Input type="email" id="email" ref={emailEl} />
            </FormItem>
            <FormItem>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" ref={passwordEl} />
            </FormItem>
            <FormActions>
                <Button type="submit">{isLogin ? 'Login' : 'Signup'}</Button>
                <Button type="button" onClick={switchModeHandler}>Switch to {isLogin ? 'Signup' : 'Login'}</Button>
            </FormActions>
        </FormRoot>
    );
};

export default AuthForm;