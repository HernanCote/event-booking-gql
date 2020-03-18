import React, { useState } from 'react';

import {
    FormActions,
    Input,
    Label,
    FormItem,
    FormRoot,
} from './StyledComponents';

import { Button } from '../Foundation';

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
            <FormItem className="form-control">
                <Label htmlFor="email">E-Mail</Label>
                <Input type="email" id="email" ref={emailEl} />
            </FormItem>
            <FormItem className="form-control">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" ref={passwordEl} />
            </FormItem>
            <FormActions className="form-actions">
                <Button type="submit">{isLogin ? 'Login' : 'Signup'}</Button>
                <Button type="button" onClick={switchModeHandler}>Switch to {isLogin ? 'Signup' : 'Login'}</Button>
            </FormActions>
        </FormRoot>
    );
};

export default AuthForm;