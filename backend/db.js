//
// DB module
//
//

const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'site',
  user: 'postgres',
  password: '123123',
  max: 20,
  idleTimeoutMillis: 500,
  connectionTimeoutMillis: 1000,
  maxUses: 7500,
})

module.exports.query = async (stmt, items) => {
    try {
        const result = await pool.query(stmt, items)
        return result["rows"]
    } catch (e) {
        console.log(e)
        return e
    }
}

