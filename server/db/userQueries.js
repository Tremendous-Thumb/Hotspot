export default function(db, pg) {
  db.findUser = function(searchObj) {
    console.log('searchObj', searchObj);
    let searchParams;
    if (searchObj.facebookId !== undefined) {
      searchParams = `where facebookId = ${searchObj.facebookId}`;
    } else {
      searchParams = `where id = ${searchObj.id}`;
    }
    return pg.query(`select * from users ${searchParams}`);
  };
  // email = ${searchObj.email}
  db.createUser = function(userObj) {
    console.log('attempting to create user with', userObj);
    return pg.query(`insert into users (name, email, facebookId, facebookAccessToken) \
      values ('${userObj.name}', '${userObj.email}', ${userObj.facebookId}, '${userObj.facebookAccessToken}')`);
  };

  db.deleteUser = function(email) {
    return pg.query(`delete from spots where id = (select id from users where email = ${email})`);
  };

}
