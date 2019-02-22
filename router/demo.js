var graphqlHTTP = require("express-graphql");

var graphql = require("graphql");

const teamList = require('../schema/teamList')
const jobList = require('../schema/jobList')
 
// 定义 Query 类型
var queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    teamList,
    jobList,
  }
}); 
 
module.exports = graphqlHTTP(async function(request1, response, graphQLParams) {

  return {
  schema: new graphql.GraphQLSchema({ query: queryType }),
  graphiql: true,
  /**
   * 一个 query 有多个查询字段，extensions 钩子只执行一次
   * @param {*} data 
   */
  extensions(data) {
    const errors = data.context[Symbol.for('graphql.response.errors')]
    if (errors && errors.length) {
      Object.assign(data.result, {
        data: null,
        errors: errors.map(item => new Error(JSON.stringify(item))),
        //aaa: 1
      })
    }
    // 删除此次请求的 request 对象
    //this[Symbol.for('request.instance1')].delete(data.context)
  },
  // 一次查询有多个根字段错误，formatError 函数会回调多次
  // formatError(...a) {
  //   debugger
  // },
  //rootValue: injectRootValue(request1),
  
//   context: {
//     a:1
//  }
  pretty: true,
  // validationRules(...arg) {
  //   debugger
  // }
}
}
);

function injectRootValue(req) {
  !this[Symbol.for('request.instance1')] && (this[Symbol.for('request.instance1')] = new Map())
  this[Symbol.for('request.instance1')].set(req, req)
  
  return this[Symbol.for('request.instance1')].get(req)
}