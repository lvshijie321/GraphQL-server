
/**
 * 运营管理 - 企业管理 - 获取团队列表
 */

 
var graphql = require("graphql");
const axios = require("../request");

var teamType = new graphql.GraphQLObjectType({
  name: "Team",
  fields: {
    company_user_id: { type: graphql.GraphQLInt },
    company_user_mobile: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    deleted_at: { type: graphql.GraphQLString },
    id: { type: graphql.GraphQLInt },
    member_count: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    status: { type: graphql.GraphQLInt },
    type: { type: graphql.GraphQLInt },
    updated_at: { type: graphql.GraphQLString },
    users_type: { type: graphql.GraphQLInt },
    users_type_desc: { type: graphql.GraphQLString }
  }
});

var teamListType = new graphql.GraphQLObjectType({
  name: "TeamList",
  fields: {
    list: { type: new graphql.GraphQLList(teamType) },
    total: { type: graphql.GraphQLInt }
  },
 
}); 


module.exports = {
  type: teamListType, 
  resolve: async function(rootValue, variable, req, field)  { 
    
     

    const data = await new Promise(resolve => {
      
      axios({
        method: 'post',
        url: '/admin/team/list',
        data:  variable,
        req: req,
        field,
      })
        //.post("/admin/team/list", variable)
        .then(function(res) {
          resolve({
            list: res.list,
            total: res.total,
          });
        })
        .catch(resolve);
      
    });
    return data;
  },
  // `args` 描述了 `user` 查询接受的参数
  args: {
    page: { type: graphql.GraphQLInt },
    company_user_mobile:  { type: graphql.GraphQLString },
    page_size:  { type: graphql.GraphQLInt },
    team_name: { type: graphql.GraphQLString },
  },
}