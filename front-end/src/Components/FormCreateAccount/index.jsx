import React, { useState } from 'react'
import { useForm } from 'react-hook-form' // Librairie qui me permet de gérer la valdiaiton du formulaire. useForm est un custom Hook qui nous permet de gérer le formulaire
import { Link } from 'react-router-dom'
import './_style.scss'
import axios from 'axios'

const FormCreateAccount = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const { handleSubmit } = useForm()

  const onSubmit = (e) => {
    let object = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    }
    if (
      checkFirstName(firstname) &&
      checkLastName(lastname) &&
      checkEmail(email) &&
      checkPassword(password)
    ) {
      let config = {
        headers: { 'Content-Type': 'application/json' },
        Accept: 'application/json',
      }

      axios
        .post(
          'http://localhost:4200/api/auth/signup',
          JSON.stringify(object),
          config
        )
        .then((res) => {
          alert(
            'Votre compte est désormais créé! Connectez-vous pour discuter avec vos collègues'
          )
          window.location.href = '/login'
        })
    } else {
      alert('Le formulaire comporte une erreur')
    }
  }
  function checkFirstName() {
    const nameRegex = (value) => {
      return /^[a-zA-Z]{3,23}$/.test(value)
    }
    const displayError = document.querySelector('.firstname-error')
    if (nameRegex(firstname)) {
      displayError.innerText = ''
      return true
    } else {
      let error = 'Le prénom doit avoir entre 3 et 6 caractères'
      displayError.innerText = error
      return false
    }
  }

  function checkLastName() {
    const nameRegex = (value) => {
      return /^[a-zA-Z]{3,23}$/.test(value)
    }
    const displayError = document.querySelector('.lastname-error')
    if (nameRegex(lastname)) {
      displayError.innerText = ''
      return true
    } else {
      let error = 'Le nom doit avoir entre 3 et 6 caractères'
      displayError.innerText = error
      return false
    }
  }

  function checkEmail() {
    const emailRegex = (value) => {
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }
    const displayError = document.querySelector('.email-error')
    if (emailRegex(email)) {
      displayError.innerHTML = ''
      return true
    } else {
      let error = "L'adresse email doit être valide"
      displayError.innerHTML = error
      return false
    }
  }

  function checkPassword() {
    const passwordRegex = (value) => {
      return /^[a-zA-Z]{8,23}$/.test(value)
    }
    const displayError = document.querySelector('.password-error')
    if (passwordRegex(password)) {
      displayError.innerHTML = ''
      return true
    } else {
      let error = 'Le mot de passe doit contenir au moins 8 caractères'
      displayError.innerHTML = error
      return false
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__input-group">
        <label>E-mail</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div className="email-error"></div>
      </div>
      <div className="form__input-group">
        <label>Password</label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Mot de passe"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="password-error"></div>
      </div>
      <div className="form__input-group">
        <label>Prénom</label>
        <input
          type="text"
          name="prénom"
          id="firstname"
          placeholder="Prénom"
          required
          onChange={(e) => setFirstname(e.target.value)}
        ></input>
        <div className="firstname-error"></div>
      </div>
      <div className="form__input-group">
        <label>Nom</label>
        <input
          type="text"
          name="nom"
          id="lastname"
          placeholder="Nom"
          required
          onChange={(e) => setLastname(e.target.value)}
        ></input>
        <div className="lastname-error"></div>
      </div>
      <button
        className="form__input-btn"
        type="submit"
        onClick={() => handleSubmit()}
      >
        Sign up
      </button>
      <span className="form__input-login">
        Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
      </span>
    </form>
  )
}

export default FormCreateAccount
