const pool = require('../db');

const createUser = async ({ name, email, password }) => {
    try{
        console.log('Inserting user with:', [name, email, password]);
        const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, password]
        );
        return result.rows[0];
    }
    catch(err){
        console.log(err);
    }

};
const findUserByEmail = async (email) => {
    try{
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
    catch(err){
        console.error('DB query error:', err);
    }

};

module.exports = { createUser , findUserByEmail };
