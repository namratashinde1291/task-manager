import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:5000/api",
});

const getTask = async (user_id) => {
  try {
    const response = await API.get(`/task/user/${user_id}`);
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const addTask = (taskData) => {
    try{
        const response = API.post('/task',taskData);
        return response;
    }
    catch(error){
        console.error("Error creating task:",error);
        throw error;
    }
}

export {getTask, addTask};