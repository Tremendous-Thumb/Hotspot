import promise from 'bluebird';
import spotQueries from './spotQueries';
import userQueries from './userQueries';

const pgp = require('pg-promise')({
  promiseLib: promise
});
const connectionString = 'postgres://localhost:5432/hotspots';
const pg = pgp(connectionString);

const db = {};

// extend db with spot and user queries
spotQueries(db, pg);
userQueries(db, pg);

export default db;
