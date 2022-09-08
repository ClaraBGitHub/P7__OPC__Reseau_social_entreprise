import React from 'react'
// import { signup } from '../../../../backend/controllers/user.js'
import FormLogin from '../../Components/FormLogin/index'
// import styled from 'styled-components'
import Header from '../../Components/Header/index'
import './_style.scss'

// if my localstorage got a userId and a token, then I am automatically login
const user = localStorage.getItem('userId')
const token = localStorage.getItem('token')
const AlreadyLoged = () => {
  if (user && token) {
    window.location.href = '/'
  }
}
const Login = () => {
  return (
    <>
      <>
        <AlreadyLoged />
      </>
      <Header />
      <main className="main">
        <FormLogin className="form" />
      </main>
    </>
  )
}

export default Login
