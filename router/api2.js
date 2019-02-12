
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const getData = require('../libs/mysql.js')

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

function someFunctionToGetRootValue(request, response, graphQLParams) {
  return new Promise((re) => {
    getData('select * from user_user;').then(r => {
      
      const root = {
        hello: 'hello'
    }
   
    re(root)
    
    
     
    
    
    })
    

  })
}

module.exports = graphqlHTTP(async (request, response, graphQLParams) => {
  return {
    schema: schema,
    rootValue: await someFunctionToGetRootValue(request, response, graphQLParams),
    graphiql: true
  }
})

