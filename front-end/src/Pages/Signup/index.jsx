import React from 'react'
// import { signup } from '../../../../backend/controllers/user.js'
import FormCreateAccount from '../../Components/FormCreateAccount/index.jsx'
// import styled from 'styled-components'
import Header from '../../Components/Header/index'
import './_style.scss'

// import IdentificationForm from '../components/IdentificationForm/IdentificationForm';

const Signup = () => {
  return (
    <>
      <Header />
      <main className="main">
        <FormCreateAccount className="form" />
      </main>
    </>
  )
}

export default Signup
