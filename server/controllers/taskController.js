const {createTask, fetchTasks} = require ('../models/taskModel');

const createTask = async (req, res) => {
    const {title,description,due_date,user_id} = req.body();
   try{
     const task = await createTask(title,description,due_date,user_id);
     if(task)
        return res.status(200).json({message :'Task created successfully'});
   }
   catch(err){
    return res.status(401).json({error:err ,message : 'error creating user'});
   }
}

const getTasks = async (req,res) =>{
    const {user_id} = req.body();
    try{
        const tasks = await fetchTasks(user_id);    
        return res.status(200).json({'tasks':tasks, message :'Tasks fetched successfully'});
    }
    catch(err){
        return res.status(401).json({error:err ,message : 'error creating user'});
    }

}