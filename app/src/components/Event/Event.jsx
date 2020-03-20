import React from 'react';

import {
    H2,
    H3,
    P,
    Button,
} from '../Foundation';

import {
    Root,
    Content,
    Actions
} from './StyledComponents';

const Event = ({
    className,
    _id,
    title,
    userId,
    creator,
    price,
    date,
    onDetailClicked,
}) => (
        <Root className={className}>
            <Content>
                <H2>{title}</H2>
                <H3>${price} - {new Date(date).toLocaleDateString('DE-de')}</H3>
            </Content>
            <Actions>
                {
                    userId === creator._id ?
                        <P>You're the owner of this event</P> :
                        <Button onClick={() => onDetailClicked(_id)}>View Details</Button>
                }
            </Actions>
        </Root>
    );

export default Event;