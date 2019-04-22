const Pool = require('pg').Pool
const pool = new Pool({
  user: 'mac',
  host: 'localhost',
  database: 'airbnb',
  port: 5432
})

// pool.on('connect', ()=>{
//   console.log('<--Connected to postgreSQL DB-->')
// });

module.exports = {pool};