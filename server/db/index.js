const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({ path: "../.env" });

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
    rejectUnauthorized: false, // This can be true or false, depending on your needs
  },
});

module.exports = {
  pool,
};
