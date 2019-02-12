const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

const Row = new GraphQLObjectType({
    name: 'Row',
    fields: {
        title: {
            type: GraphQLString
        }
    }
})
const queryObj = new GraphQLObjectType({
    name: 'page',
    description: '分页例子',
    fields: {
        articles: {
            name: 'articles',
            description: '分页例子',
            type: new GraphQLObjectType({
                name: 'ArticlePagination',
                fields: {
                    total_items: {
                        type: GraphQLInt
                    },
                    pages: {
                        type: GraphQLInt
                    },
                    page_no: {
                        type: GraphQLInt
                    },
                    page_items: {
                        type: GraphQLInt
                    },
                    rows: {
                        type:  new GraphQLList(Row)
                    },
                }
            }),
            args: {
                page_no: {  // 这里定义参数，包括参数类型和默认值
                    type: GraphQLInt,
                    defaultValue: 1
                },
                page_items: {
                    type: GraphQLInt,
                    defaultValue: 10
                }
            },
            resolve(parentValue, args, request) { // 这里演示如何获取参数，以及处理
                console.log(args)
                const rows = [
                    {title: '1'},
                    {title: '2'},
                    {title: '3'},
                    {title: '4'},
                    {title: '5'},
                    {title: '6'},
                    {title: '7'},
                    {title: '8'},
                    {title: '9'},
                    {title: '10'},
                    {title: '11'},
                    {title: '12'},
                    {title: '13'},
                    {title: '14'},
                    {title: '15'},
                    {title: '16'},
                    {title: '17'},
                    {title: '18'},
                    {title: '19'},
                    {title: '20'},
                  ]
                  const start = (args.page_no - 1) * args.page_items
                
                
                  return {
                    total_items: 100,
                    pages: 10,
                    page_no: 1,
                    page_items: 10,
                    rows: rows.slice(start, start + args.page_items)
                }
            }
        }, 
    }
});

module.exports = new GraphQLSchema({
    query: queryObj 
});
