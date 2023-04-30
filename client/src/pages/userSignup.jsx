import React from 'react'
import Header from '../components/userSignup/header'
import Form from '../components/userSignup/signupForm'
import '../stylesheets/userSignup.css'

function Signup() {
  return (
    <>
    <div className='ownerSignupDiv'>
        <div className='innerDivOwnerSignup'>
          <Header/>
          <Form/>
        </div>
    </div>
    </>
  )
}

export default Signup
