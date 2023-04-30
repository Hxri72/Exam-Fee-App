import React from 'react'
import Form from '../components/userLogin/loginForm'
import Header from '../components/userSignup/header'
import '../stylesheets/userLogin.css'

function Login() {
  return (
    <>
    <div className='ownerSignupDiv'>
      <div className='divwrapperOwner'>
        <Header/>
        <Form/>
      </div>
    </div>
    </>
  )
}

export default Login
