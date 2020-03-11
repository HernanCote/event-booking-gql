const {
    Event,
    User,
} = require('../../models');

const { toEventDTO, getUser } = require('./helpers');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => (
                toEventDTO(event)
            ));
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated - user does not have permission to create events');
        }
        const { description, title, price, date } = args.eventInput;
        const event = new Event({
            title,
            description,
            price: +price,
            date: new Date(date),
            creator: req.userId,
        });
        try {
            const eventResult = await event.save();
            const fetchedUser = await User.findById(req.userId);

            if (!fetchedUser) {
                throw new Error('User does not exists');
            }

            fetchedUser.createdEvents.push(event);
            await fetchedUser.save();

            return {
                ...eventResult._doc,
                creator: getUser(event._doc.creator)
            };
        } catch (err) {
            throw err;
        }
    },
};