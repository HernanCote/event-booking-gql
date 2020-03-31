import React from 'react';

import {
    ListRoot,
} from './StyledComponents';
import Booking from '../Booking';

const BookingList = ({
    className,
    bookings,
    onCancelBooking
}) => (
        <ListRoot className={className}>
            {bookings.map((booking, idx) => (
                <Booking
                    key={booking._id || idx}
                    {...booking}
                    onCancelBooking={onCancelBooking} />
            ))}
        </ListRoot>
    );

export default BookingList;