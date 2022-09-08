import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import './_style.scss'
import axios from 'axios'

const FormLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginOk, loginFail] = useState(true)

  const onSubmit = (e) => {
    let object = {
      email: email,
      password: password,
    }

    let config = {
      headers: { 'Content-Type': 'application/json' },
      Accept: 'application/json',
    }
    axios
      .post(
        'http://localhost:4200/api/auth/login',
        JSON.stringify(object),
        config
      )
      .then((res) => {
        if (res.status == 200) {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.userId)
          window.location.href = '/'
        }
      })
      .catch((err) => {
        loginFail(false)
      })
  }

  return (
    <div className="form" onSubmit={onSubmit}>
      <div className="form__input-group">
        <label>E-mail</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          required
          onChange={
            (e) => setEmail(e.target.value) // The spread operator allow me to access to all the information inside my userSignup const.
          }
        ></input>
      </div>
      <div className="form__input-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      {!loginOk && (
        <p>Erreur de connexion, veuiller vérifier vos identifiants </p>
      )}
      <button
        className="form__input-btn"
        type="submit"
        onClick={() => onSubmit()}
      >
        Sign up
      </button>
      <span className="form__input-login">
        Vous n'avez pas encore de compte ?{' '}
        <Link to="/signup">Créer un compte</Link>
      </span>
    </div>
  )
}

export default FormLogin
