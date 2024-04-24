import React from 'react'

const Task = ({ task, onDelete }) => {
    const formattedDate = new Date(task.created_at).toLocaleDateString("en-US")

  return (
    <div className='task-container border border-gray-300 rounded-lg p-4 my-5'>
        <p className='task-title text-gray-800 text-xl font-semibold'>{task.title}</p>
        <p className='task-content text-gray-600 mt-2'>{task.content}</p>
        <p className='task-date text-gray-400 text-xs mt-2'>{formattedDate}</p>
        <button className='delete-button bg-[#f44336] hover:bg-[#d32f2f] text-white font-bold py-2 px-4 rounded mt-3' 
            onClick ={() => onDelete(task.id)}>
            Delete
        </button>
    </div>
  )
}

export default Task