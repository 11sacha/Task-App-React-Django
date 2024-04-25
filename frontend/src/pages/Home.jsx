import React, { useEffect, useState } from 'react'
import api from '../api';
import Task from '../components/Task';
//import LogOutBtn from '../components/LogOutBtn';

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
            .delete(`/api/task/delete/${id}/`)
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
            .post("/api/tasks/", { content, title})
            .then((res) => {
                if (res.status === 201) alert("Task created!")
                else alert("Failed to create task.")
                getTasks();
                setTitle("");
                setContent("");
            })
            .catch((error) = alert(error));
        
    };


  return (
    <div>
        <div className='flex flex-row justify-between mb-1'>
            <h2 className='text-gray-800 text-3xl pl-10 pt-3 underline'>Tasks:</h2>
            {/* <LogOutBtn /> */}
        </div>
        <div className='mb-8 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {tasks.map((task) => (
                <Task task={task} onDelete={deleteTask} key={task.id} className='note bg-gray-100 border-l-4 border-blue-500 my-1 p-3 rounded-lg w-auto ' />
            ))}
        </div>
        <h2 className='text-gray-800 text-3xl mb-6 pl-10 underline'>Create a Task:</h2>
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