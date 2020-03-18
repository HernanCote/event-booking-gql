const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const mongoose = require('mongoose');

const isAuth = require('./middleware/is-auth');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('request received');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use('/graphql',
    graphQLHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
    })
);

mongoose.connect(
    `mongodb://mongo/${process.env.DATABASE}`,
    { useNewUrlParser: true }
).then(() => {
    const PORT = process.env.PORT || 8000;
    console.log(`Started server at port ${PORT}`);
    app.listen(PORT);
}).catch(err => {
    console.log(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            statusCode: error.status
        }
    });
});