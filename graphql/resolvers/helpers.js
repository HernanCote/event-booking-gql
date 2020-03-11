const { toDate } = require('../../utils');

const {
    Event,
    User,
} = require('../../models');

const getEvents = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return toEventDTO(event);
        });
    } catch (err) {
        throw err;
    }
};

const getUser = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: getEvents.bind(this, user._doc.createdEvents),
        };
    } catch (err) {
        throw err;
    }
};

const getSingleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return toEventDTO(event);
    }
    catch (err) {
        throw err;
    }
};


const toBookingDTO = booking => ({
    ...booking._doc,
    user: getUser(booking._doc.user),
    event: getSingleEvent(booking._doc.event),
    createdAt: toDate(booking._doc.createdAt),
    updatedAt: toDate(booking._doc.updatedAt),
});


const toEventDTO = event => (
    {
        ...event._doc,
        _id: event.id,
        date: toDate(event._doc.date),
        creator: getUser.bind(this, event.creator),
    }
);


module.exports = {
    getEvents,
    getUser,
    getSingleEvent,
    toEventDTO,
    toBookingDTO,
};