const pool = require('../db');

const addTask = async ({title,description,due_date,user_id}) => {
    try{
        const result = await pool.query("insert into tasks (title,description,due_date,status,user_id) values ($1,$2,$3,'pending',$4) RETURNING id, title,description,due_date,status,user_id",
        [title,description,due_date,user_id]
        );
        return result.rows[0];
    }
    catch(err){
        return err;
    }
};

const fetchTasks = async ({ user_id }) => {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [user_id]
  );
  return result.rows;
};

module.exports = { fetchTasks, addTask };