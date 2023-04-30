import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../axios/user/user'

function Form() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const loginData = {
    email:email,
    password:password
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    const response = await loginUser(loginData)
    if(response.success){
      localStorage.setItem("userToken",response.data)
      navigate('/')
    }else{
      return toast.error(response.message)
    }
  }
  return (
    <>
    <div className='ownerLoginformdiv'>
      <div className='flex justify-center lg:justify-center mr-32 md:justify-center ml-32 sm:justify-center'>
        <div className='ownerSignupForm'>
            <div className='grid justify-center p-12 gap-11'>
            <h1 className='text-2xl font-medium text-white'>LOGIN</h1>
            <form className='grid gap-4' onSubmit={handleLogin}>
             
              <input 
              className='ownerSignupInputField' 
              type='email' 
              name='email' 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input 
              className='ownerSignupInputField' 
              type='password' 
              name='password' 
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ></input>
              <div className='flex justify-center '>
              <button type='submit' className='border-2 mt-4 w-24 rounded-md h-10 font-medium border-gray-900 text-white hover:bg-gray-900'>
                Login
              </button>
              </div>
            </form>
            <Link to={'/signup'}> 
            <div>
            <h1 className='text-white font-medium text-sm'>Don't have an account? <span className='text-red-400'>Signup here</span></h1>
            </div>
            </Link>
          </div>
              
        </div>
      </div>
    </div>
    </>
  )
}

export default Form
