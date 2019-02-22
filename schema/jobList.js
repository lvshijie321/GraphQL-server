
/**
 * 运营管理 - 企业管理 - 获取团队列表
 */

 
var graphql = require("graphql");
const axios = require("../request");

var jobType = new graphql.GraphQLObjectType({
  name: "Job",
  fields: {
    company_creator_mobile: { type: graphql.GraphQLString },
  }
});

var jobListType = new graphql.GraphQLObjectType({
  name: "JobList",
  fields: {
    list: { type: new graphql.GraphQLList(jobType) },
    total: { type: graphql.GraphQLInt }
  },
 
}); 


module.exports = {
  type: jobListType, 
  resolve: async function(_, variable, req, field)  {
    this.$___ === req
    this[Symbol.for('token')] = req.headers.token


    const data = await new Promise(resolve => {
      axios({
        method: 'post',
        url: '/admin/task/list',
        data:  variable,
        req: req,
        field
      })
      // axios
      //   .post("/admin/task/list", variable)
        .then(function(res) { // 200
           
          resolve({
            list: res.list,
            total: res.total,
          });
          // resolve(
          //   !response.data.data.flag
          //     ? data
          //     : new Error(JSON.stringify(response.data.data))
          // );
          
        })
        .catch(resolve);

      
    });
    return data;
  },
  // `args` 描述了 `user` 查询接受的参数
  args: {
    status: { type: graphql.GraphQLString },
  },
}