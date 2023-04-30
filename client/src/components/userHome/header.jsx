import React from 'react'
import {useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const handleLogout = () => {
        try {
            localStorage.removeItem("userToken")
            navigate('/login')
        } catch (error) {
            return error.response
        }
    }
  return (
    <>
        <div className='w-full h-auto bg-slate-200 '>

            <div className='flex justify-end p-4 font-medium'>
                <h1 className='mr-8 mt-1 '>User</h1>
                <button className='bg-slate-700 px-3 py-1 rounded-md text-white' onClick={handleLogout}>Logout</button>
            </div>

            <div className='w-full flex justify-center'>
                <h1 className='font-medium text-3xl  p-4'>Exam Fee App</h1>
            </div>
            
        </div>
    </>
  )
}

export default Header
