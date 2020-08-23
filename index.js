const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// GraphQL schema
const schema = buildSchema(`
 type Query {
 message: String
 }
`);

// Root resolver
const root = {
  message: () => 'Hello World!'
}

/**
 * express
 */
const app = express()
const port = 3000

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
