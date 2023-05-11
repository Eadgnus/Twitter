// import { mysql } from 'mysql2';
import SQ from 'sequelize'
import { config } from '../config.js'

// const pool = mysql.createPool({
//     host: config.db.host,
//     user: config.db.user,
//     database: config.db.database,
//     password: config.db.password
// });

// export const db = pool.promise();

const { host, user, database, password } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
    host, // host: host
    dialect: 'mysql',
    logging: false
});
