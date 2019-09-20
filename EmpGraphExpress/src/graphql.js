const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = require('./app');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Emp {
    name: String,
    age: Int
  }

  type Query {
    hello: Emp,
    hello2: String,
    hello3: String
  }
`);

/***
 * We declare Emp to use Object in query hello. For other queries, we are using String
 * 
 */

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return {
        name: 'san',
        age: '1'
    };
  },
  hello2: () => {
    return 'Hello world2!';
  },
  hello3: () => {
    return 'Hello world3!';
  }
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

// Run the GraphQL query '{ hello }' and print out the response
/*graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});*/

module.exports = app;
