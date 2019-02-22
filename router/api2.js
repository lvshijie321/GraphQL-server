
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const getData = require('../libs/mysql.js')

var schema = buildSchema(`
type Query {
  products: Products
}
type Products {
   
  name: String
  manufacturer: String
  price: Int
  a: String
  b: String
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
var rootValue = {
  products: {
    
    name: 'String',
    manufacturer: 'String',
    price: 1,
    a: 'String',
    b: 'String'
   }
   
}
module.exports = graphqlHTTP(async (request, response, graphQLParams) => {
  return {
    schema: schema,
    rootValue,
    graphiql: true
  }
})

