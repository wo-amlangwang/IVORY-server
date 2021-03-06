/*jshint esnext: true */

/*npm package*/
import squel    from 'squel';
import Promise  from 'bluebird';

function createUser(pool,data){
  var ps = new Promise(function(resolve, reject) {
    pool.getConnection(function(err,connection) {
      if(err){
        return reject(err);
      }
      var querystring = squel.insert()
      .into(process.env.dbname  + '.user')
      .set('email',data.email)
      .set('name',data.name)
      .set('fbid',data.id)
      .toString();
      connection.query(querystring,function (err,rows) {
        if(err){
          connection.release();
          return reject(err);
        }else {
          connection.release();
          return resolve(rows);
        }
      });
    });
  });
  return ps;
}

module.exports = createUser;
