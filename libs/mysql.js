var mysql      = require('mysql');

 

function getData(sql) {
  var connection = mysql.createConnection({
    multipleStatements: true,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'user',
    port: '3307',
  });

  return new Promise((resolve, reject) => {
    connection.connect();
    
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        reject(error)
      };
      resolve(results)
      connection.end();
       
    });
  })
}
 
module.exports = getData
 

