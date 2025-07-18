const {pool} = require('../db');

const createTask = async (title,description,due_date,user_id) => {
    try{
        const result = await pool.query ("insert into tasks (title,description,due_date,status,user_id) values ($1,$2,$3,'pending',$4)",
        [title,description,due_date,user_id]
        );
        return result.rows[0];
    }
    catch(err){
        return err;
    }
};

const fetchTasks = async (user_id) =>{
    try{
        const result = await pool.query ("select * from tasks where user_id=$1 order by created_at desc", 
        [user_id]);
        return result.rows[0];
    }
    catch(err){

    }
};

module.export = {addTask, fetchTasks}