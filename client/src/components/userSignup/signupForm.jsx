import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { signupUser } from '../../axios/user/user'
import '../../stylesheets/userSignup.css'
import { useNavigate } from 'react-router-dom'

function Form() {
  const [fullname,setFullname] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setconfirmPassword] = useState("")
  const navigate = useNavigate()

  const signupData = {
    fullname:fullname,
    email:email,
    password:password,
    confirmPassword:confirmPassword
  }

  const handleSignup = async(e) => {
    try {
      e.preventDefault();
    if(fullname === ""){
      toast.error('Fullname is required')
    }else if(email === ""){
      return toast.error("Email is required")
    }else if(password === ""){
      return toast.error("Password is required")
    }else if(password.length < 8){
      return toast.error('Password need minimum 8 characters')
    }else if(confirmPassword !== password){
      return toast.error("Password is not matched")
    }  
    
    const response = await signupUser(signupData)
    console.log(response.success)
    if(response.success){
      toast.success(response.message)
      setTimeout(() => {
        navigate('/login')
      }, 3000);
      
    }else if(response.success === false){
      return toast.success(response.message)
    }

    } catch (error) {
      return toast.error('something went wrong')
    }
  }
  return (
    <>
    <div className='ownerSignupformdiv'>
      <div className='flex justify-center lg:justify-center mr-32 md:justify-center ml-32 sm:justify-center'>
        <div className='ownerSignupForm'>
            <div className='grid justify-center p-12 gap-11'>
            <h1 className='text-2xl font-medium text-white'>SIGN UP</h1>
            <form className='grid gap-4' onSubmit={handleSignup}>
              <input 
              className='ownerSignupInputField' 
              type='text' 
              name='fullname' 
              placeholder='Fullname'
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              autocomplete="off"
              >
              </input>
              <input 
              className='ownerSignupInputField' 
              type='email' 
              name='email' 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autocomplete="off"
              ></input>
              <input 
              className='ownerSignupInputField' 
              type='password' 
              name='password' 
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="off"
              ></input>
              <input 
              className='ownerSignupInputField' 
              type='password' 
              name='confirmPassword' 
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              autocomplete="off"
              ></input>
              <small className='text-gray-400'> you are accepted to all terms and conditions</small>
              <div className='flex justify-center '>
              <button type='submit' className='border-2 mt-4 w-24 rounded-md h-10 font-medium border-gray-900 text-white hover:bg-gray-900'>
                Signup
              </button>
              </div>
            </form>
            <Link to={'/login'}>
            <div>
            <h1 className='text-white font-medium text-sm'>Already have an account? <span className='text-red-400'>Login here</span></h1>
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
