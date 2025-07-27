import React, {useEffect, useState} from "react" ;
import { getTask, addTask } from "../api/taskApi";
import "./home.css";
import { useAsyncError } from "react-router-dom";

function Home (){
    const [tasks, setTasks]= useState([]);
    const [form, setForm] = useState({title:"", description:"",status:"pending"});
    const user_id ='6eab0ea6-5aaa-4437-a8f8-b59c74ff6293';

    useEffect(() => {
        fetchTasks();
    },[]);

    const fetchTasks = () => {
        getTask(user_id)
        .then(res => setTasks(res.data.tasks))
        .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({...form,user_id})
        .then(
            res=>{
                setForm({...form,[e.target.name]:e.target.value});
                fetchTasks();
        })
        .catch(err => console.log(err));
    }

    return(
        <div className="container mt-4">
            <form className="mb-4" onSubmit={handleSubmit}>
                <input name='title' placeholder="Enter Title" className="form-control mb-2" value={form.name} onChange={handleChange}></input>                
                <input name='description' placeholder="Enter Description" className="form-control mb-2" value={form.description} onChange={handleChange}></input>
                <select name='status' className="form-select mb-2" value='form.status' onChange={handleChange}>
                    <option value='pending'>Pending</option>
                    <option value='done'>Completed</option>
                </select>
                <button className='btn btn-primary'>Add Task</button>
            </form>
            <h2 className="text-center mb-4">Your Tasks</h2>
            <ul className="list-group">
                {tasks.map(task => (
                <li
                    key={task.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                    task.status === 'completed' ? 'text-muted text-decoration-line-through' : ''
                    }`}
                >
                    <span>{task.title}</span>
                    <span className="badge bg-primary">{task.status}</span>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;

