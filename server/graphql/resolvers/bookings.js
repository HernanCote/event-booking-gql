const {
    Event,
    Booking,
} = require('../../models');

const { toEventDTO, toBookingDTO } = require('./helpers');


module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated - user does not have permission to search for bookings');
        }
        try {
            const bookings = await Booking.find({ user: req.userId });
            return bookings.map(booking => {
                return toBookingDTO(booking);
            });
        }
        catch (err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated - user does not have permission to book events');
        }
        const { eventId } = args;
        try {
            const event = await Event.findOne({ _id: eventId });

            const booking = new Booking({
                user: req.userId,
                event,
            });
            const result = await booking.save();
            return toBookingDTO(result);
        }
        catch (err) {
            throw err;
        }
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated - user does not have permission to cancel bookings');
        }
        const { bookingId } = args;
        try {
            const booking = await Booking.findById(bookingId).populate('event');
            const event = toEventDTO(booking.event);
            await Booking.deleteOne({ _id: bookingId });
            return event;
        }
        catch (err) {
            throw err;
        }
    },
};