import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import LoadingInd from './LoadingInd'


const Form = ({route, method}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <form 
        onSubmit={handleSubmit} 
        className='form-container flex flex-col items-center justify-center mx-auto my-20 p-8 rounded-lg shadow-md max-w-sm'>
        <h1 className="text-2xl pb-4">{name}</h1>
        <input 
            type="text" 
            className='form-input w-full px-4 py-2 my-2 border border-[#ccc] rounded-md' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
        />
        <input 
            type="password" 
            className='form-input w-full px-4 py-2 my-2 border border-[#ccc] rounded-md' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password' 
        />
        {loading && <LoadingInd />}
        <button 
            className='form-button w-full px-4 py-2 my-4 bg-[#007bff] text-white rounded-md cursor-pointer transition duration-200 ease-in-out hover:bg-[#0056b3]' 
            type='submit'>
            {name}
        </button>
    </form>
  )
}

export default Form