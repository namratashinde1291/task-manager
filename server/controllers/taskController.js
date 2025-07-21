const {addTask, fetchTasks, updateTask} = require ('../models/taskModel');

const createTask = async (req, res) => {
    const {title,description,due_date,user_id} = req.body;
   try{
     const task = await addTask({title,description,due_date,user_id});
     if(task)
        return res.status(200).json({message :'Task created successfully'});
   }
   catch(err){
    console.log(err);
    return res.status(401).json({error:err ,message : 'error creating user'});
   }
};

const getTasks = async (req,res) =>{
    const {user_id} = req.params;
    try{
        const tasks = await fetchTasks({user_id});    
        return res.status(200).json({'tasks':tasks, message :'Tasks fetched successfully'});
    }
    catch(err){
        return res.status(401).json({error:err ,message : 'error fetching tasks'});
    }

};

const editTask  = async (req, res) => {
    const { task_id } = req.params;
    const { title, description, due_date, status, user_id } = req.body;

    try{
        const task = await updateTask({title, description, due_date, status, user_id,task_id});
        return res.status(200).json({'task': task, message:'Task updated successfully'});
    }
    catch(err){
        return res.status(401).json({error:err ,message : 'error updating tasks'});
    }
}

module.exports = {createTask, getTasks, editTask};