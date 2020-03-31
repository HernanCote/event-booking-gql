import React from 'react';

import { H1, Button } from '../Foundation';

import {
    Root,
    Title,
    Content,
    Actions,
} from './StyledComponents';

const Modal = ({
    title,
    children,
    canClose,
    canConfirm,
    onClose,
    onConfirm,
    confirmText,
}) => (
        <Root>
            <Title>
                <H1>{title}</H1>
            </Title>
            <Content>{children}</Content>
            <Actions>
                {canClose && <Button onClick={onClose}>Close</Button>}
                {canConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
            </Actions>
        </Root>
    );

export default Modal;