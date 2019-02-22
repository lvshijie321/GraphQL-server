const axios = require('axios')
var instance = axios.create({
  baseURL: 'http://ck-api.ci.dev.lanxinka.com/1.0',
  timeout: 10000,
  headers: {
    Authorization: null,
  },
  // transformRequest: [function (data, headers) {
  //   // Do whatever you want to transform the data
  //   debugger
  //   return data;
  // }],
});

instance.interceptors.request.use(function(config) {
    config[Symbol.for('graphql.request.rank')] = Symbol()
    config.headers.Authorization = config.req.headers.token
    return config;
});

instance.interceptors.response.use(function(config) {
  if(config.data.code !== 0) {
    // config.data.data = {
    //   code: config.data.code,
    //   message: config.data.msg,
    //   flag: true,
    // }
    // 收集错误信息（一个 graphql请求可以有多个 query 查询，所以错误信息对象是一个数组）
    resolveErrors(config)
      .push(injectErrorParams({
        ...config.data,
      }, config))
    
    // let errors = this[Symbol.for('graphql.interceptors.response.errors')]
    // !errors && (errors = this[Symbol.for('graphql.interceptors.response.errors')] = [])
    // errors.push()
    return Promise.reject(config)
  } else {
    return Promise.resolve(config)
  }
}, function(error) {
  ///todo：接口返回 500 这类的错误还没测试，只测试了 400
  
  resolveErrors(error)
    .push(injectErrorParams({
      msg: error.message,
      code: error.response.status,
    },error))
});

module.exports = function(option) {
  return new Promise((resolve, reject) => {
    instance(option)
      .then(response => {
        resolve(response.data.data)
      })
      .catch(function(error) {
        
        reject(error)
      })
  })
  
  
}

function resolveErrors(config) {
  return config.config.req[Symbol.for('graphql.response.errors')] || (config.config.req[Symbol.for('graphql.response.errors')] = [])
}

function injectErrorParams(error, config) {
  return Object.assign(error, {
    path: [config.config.field.fieldName]
  })
}