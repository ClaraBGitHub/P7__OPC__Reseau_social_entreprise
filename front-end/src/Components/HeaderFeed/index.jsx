import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' //Ici, j'utilise  Link, qui nous vient de React Router et se comporte comme une balise anchor. Il est donc très important de l'utiliser lorsque vous souhaitez naviguer pour l'accessibilité de votre application (et non utiliser des redirections déclenchées par des  onClick).
import WhiteLogo from '../../Assets/icon-left-font-monochrome-white.png'
import './_style.scss'
import axios from 'axios'

const HeaderFeed = () => {
  const [data, setData] = useState([])
  const user = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    Accept: 'application/json',
  }

  // If localstorage is empty, we are not connected so we go back to the login page
  if (!user || !token) {
    document.location.href = 'http://localhost:3000/login'
  }

  useEffect(() => {
    const UserInfo = axios
      .get(`http://localhost:4200/api/auth/user/${user}`, config)
      .then((res) => {
        if (res.status == 200) {
          setData(res.data.user)
        }
      })
  }, [])

  const Logout = () => {
    window.localStorage.clear()
  }
  return (
    <div className="headerBloc">
      <Link to="/">
        <img src={WhiteLogo} alt="Logo Groupamania" />
      </Link>
      <div className="welcomeNav">
        <span>
          <h1>Bienvenue {data.firstname}</h1>
        </span>
        <span className="navbar">
          <Link
            className="navbar__signout"
            to="/login"
            onClick={() => Logout()}
          >
            Se déconnecter
          </Link>
        </span>
      </div>
    </div>
  )
}
export default HeaderFeed
