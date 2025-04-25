const { Pool } = require("pg")

//  const pool = new Pool({
//   user: process.env.DATABASE_USER,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_DATABASE,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
 
// })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  pool,
}