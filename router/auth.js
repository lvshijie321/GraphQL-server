var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const getData = require('../libs/mysql.js')

var schema = buildSchema(`
  type Query {
    articles(page_no: Int, page_items: Int!): ArticlePagination
    # 或去掉逗号 articles(page_no:1  page_items:10) {
  }
  # 文章分页对象
  type ArticlePagination {

    # 总共有多少条数据
    total_items: Int!

    # 总共有多少页
    pages: Int!

    # 当前页号
    page_no: Int!

    # 每页显示多少条数据
    page_items: Int!

    # 分页列表
    rows: [Article]
  }
  type Article {
    name: String
    sex: Int
  }
`)

 

function someFunctionToGetRootValue(request, response, graphQLParams) {
  
  return new Promise((re) => {
    const token = request.headers.token
    if (!token) {
      const start = (graphQLParams.variables.pageNo - 1) * 5
      // const end = 
       getData(`select * from user_user limit ${start},${graphQLParams.variables.pageSize};select count(*) as count from user_user;`).then(r => {
          
         const root = {
           articles(obj, args, context, info) {
             console.log(obj)
             
           
           
             return {
               total_items: r[1][0].count,
               pages: () => {
                 return r[1][0].count % 5 === 0 ? Math.ceil(r[1][0].count / 5) : r[1][0].count / 5
               },
               page_no: graphQLParams.variables.pageNo,
               page_items: 5,
               rows: r[0]
             }
           }
         }
   
         
       re(root)
       
       
        
       
       
       })
    } else {
      re({a:1})
    }
    
    

  })
}

module.exports = graphqlHTTP(async (request, response, graphQLParams) => {
  return {
    schema: schema,
    rootValue: await someFunctionToGetRootValue(request, response, graphQLParams),
    graphiql: true
  }
})