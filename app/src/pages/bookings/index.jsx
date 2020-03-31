import React, { useState, useEffect, useContext } from 'react';

import Spinner from '../../components/Spinner';
import BookingList from '../../components/BookingList';

import authContext from '../../context/auth-context';

const BookingsIndex = () => {

    const { token } = useContext(authContext);
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setIsLoading(true)
        const requestBody = {
            query: `
                query {
                    bookings {
                        _id
                        createdAt
                        event {
                            _id
                            title
                            date
                        }
                    }
                }
            `,
        };

        try {
            const response = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed');
            }
            const { data, errors } = await response.json();
            if (errors) {
                throw new Error(errors[0].message);
            }
            const { bookings: fetchedBookings } = data;
            setBookings(fetchedBookings);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    };

    const cancelBookingHandler = async (bookingId) => {
        setIsLoading(true)
        const requestBody = {
            query: `
                mutation {
                    cancelBooking(bookingId: "${bookingId}") {
                        _id
                        title
                    }
                }
            `,
        };

        try {
            const response = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed');
            }
            const { data, errors } = await response.json();
            if (errors) {
                throw new Error(errors[0].message);
            }

            if (data) {
                const updatedBookings = bookings.filter(booking => booking._id !== bookingId)
                setBookings(updatedBookings);
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ?
                <Spinner /> :
                <BookingList
                    bookings={bookings}
                    onCancelBooking={cancelBookingHandler}
                />
            }
        </>
    );
};

export default BookingsIndex;