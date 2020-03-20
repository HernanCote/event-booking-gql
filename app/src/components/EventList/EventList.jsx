import React from 'react';

import {
    EventsList,
} from './StyledComponents';

import Event from '../Event';

const EventList = ({
    className,
    events,
    authUserId,
    onDetailClicked,
}) => (
        <EventsList className={className}>
            {events.map((event) =>
                <Event
                    key={event._id}
                    userId={authUserId}
                    {...event}
                    onDetailClicked={onDetailClicked}
                />
            )}
        </EventsList>
    );

export default EventList;