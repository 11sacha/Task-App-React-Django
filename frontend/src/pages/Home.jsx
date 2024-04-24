import React, { useEffect, useState } from 'react'
import api from '../api';
import Task from '../components/Task';

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        getTasks();
    }, [])

    const getTasks = () => {
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => { setTasks(data); console.log(data) })
            .catch((error) => alert(error));
    };

    const deleteTask = (id) => {
        api
            .delete(`/api/task/delete/${id}`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!")
                else alert("Failed to delete task.")
                getTasks();
            })
            .catch((error) => alert(error));
    };

    const createTask = (e) => {
        e.preventDefault();
        api
            .post("/api/tasks", { content, title})
            .then((res) => {
                if (res.status === 201) alert("Task created!")
                else alert("Failed to create task.")
                getTasks();
            })
            .catch((error) = alert(error));
    };


  return (
    <div>
        <div className='mb-8'>
            <h2 className='text-gray-800 text-3xl'>Tasks</h2>
            {tasks.map((task) => (
                <Task task={task} onDelete={deleteTask} key={task.id} className='note bg-gray-100 border-l-4 border-blue-500 my-4 p-4 rounded-lg' />
            ))}
        </div>
        <h2 className='text-gray-800 text-3xl mb-6'>Create a Task</h2>
        <form onSubmit={createTask} className='bg-white p-8 rounded-lg shadow-md max-w-md mx-auto'>
            <label htmlFor="title" className='block font-bold mb-2'>Title:</label>
            <br />
            <input 
                type="text" 
                id='title' 
                name='title' 
                required 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                className='w-full px-4 py-2 mb-4 border border-gray-300 rounded-md'
            />
            <label htmlFor="content" className='block font-bold mb-2'>Content:</label>
            <br />
            <textarea 
                name="content" 
                id="content" 
                required 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className='w-full px-4 py-2 mb-6 border border-gray-300 rounded-md'
            ></textarea>
            <br />
            <input type="submit" value="Submit" className='bg-[#007bff] hover:bg-[#0056b3] text-white font-bold py-2 px-4 rounded cursor-pointer'/>
        </form>
        
    </div>
  )
}

export default Home