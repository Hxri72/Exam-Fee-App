import React from 'react'
import FeeSelection from '../components/userHome/feeSelection'
import Header from '../components/userHome/header'
import '../stylesheets/userHome.css'

function Home() {
  return (
    <>
      <div className='mainDivHome'>
        <Header/>
        <FeeSelection/>
      </div>
    </>
  )
}

export default Home
