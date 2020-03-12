const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    User,
} = require('../../models');

const createUser = async args => {
    const { email, password } = args.userInput;
    try {
        let user = await User.findOne({ email });
        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user = new User({
            email,
            password: hashedPassword,
        });
        const result = await user.save();
        return { ...result._doc, password: null };
    } catch (err) {
        throw err;
    }
};

const login = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Invalid email or password')
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            `${process.env.SECRET}`,
            {
                expiresIn: '1h',
            },
        );

        return {
            userId: user.id,
            token,
            tokenExpiration: 1,
        };
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    login
};