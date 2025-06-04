const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',         
  user: 'root',  
  password: '', 
  database: 'bug',                    
};

const pool = mysql.createPool(dbConfig);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Successfully connected to MySQL database');
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();

module.exports = pool;
