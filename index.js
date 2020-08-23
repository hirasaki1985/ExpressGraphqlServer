import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer }  from 'apollo-server-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
// import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import myGraphQLSchema from './mySchema.js';

const PORT = 3000;
const app = express();

app.use('/graphql', bodyParser.json());

const apolloServer = new ApolloServer({ schema: myGraphQLSchema });
apolloServer.applyMiddleware({ app });

// const pubsub = new PubSub();
const server = createServer(app);

server.listen(PORT, () => {
  new SubscriptionServer({
    execute,
    subscribe,
    schema: myGraphQLSchema,
  }, {
    server: server,
    path: '/subscriptions',
  });
});