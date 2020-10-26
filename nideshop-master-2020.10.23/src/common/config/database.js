const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  //database: 'nideshop',
  //prefix: 'nideshop_',

  database: 'mobieshop',
  prefix: 'mobieshop_',

  encoding: 'utf8mb4',

  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',


  /*host: 'gz-cynosdbmysql-grp-nstk3xy5.sql.tencentcdb.com',
  port: '21504',
  user: 'root',
  password: 'wx71766143b73f03dc',*/

  dateStrings: true

 

  /*
  host: 'cdb-7f0tnyw1.gz.tencentcdb.com',
  port: '10037',
  user: 'root',
  password: 'wx71766143b73f03dc',
  */
};
