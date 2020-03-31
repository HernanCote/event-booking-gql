import React from 'react';

import { Button } from '../Foundation';
import {
    BookingItem,
    BookingInfo,
    BookingActions,
} from './StyledComponents';

const Booking = ({
    className,
    event,
    createdAt,
    _id,
    onCancelBooking,
}) => (
        <BookingItem className={className}>
            <BookingInfo>
                {event.title} - {new Date(createdAt).toLocaleDateString('DE-de')}
            </BookingInfo>
            <BookingActions>
                <Button onClick={() => onCancelBooking(_id)}>Cancel</Button>
            </BookingActions>
        </BookingItem>
    );

export default Booking;