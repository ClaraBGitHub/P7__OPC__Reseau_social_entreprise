import { Link } from 'react-router-dom' // Ici, j'utilise  Link  , qui nous vient de React Router et se comporte comme une balise anchor  . Il est donc très important de l'utiliser lorsque vous souhaitez naviguer pour l'accessibilité de votre application (et non utiliser des redirections déclenchées par des  onClick  ).
// import styled from 'styled-components'
// import DarkLogo from '../../Assets/icon-left-font-monochrome-black.png'
import WhiteLogo from '../../Assets/icon-left-font-monochrome-white.png'
import './_style.scss'

function Header() {
  return (
    <div className="headerBloc">
      <Link to="/">
        <img src={WhiteLogo} alt="Logo Groupamania" />
      </Link>
      <span className="navbar">
        <Link className="navbar__signup" to="/signup">
          <button> Créer un compte</button>
        </Link>
        <Link className="navbar__signup" to="/login">
          <button> Se connecter</button>
        </Link>
      </span>
    </div>
  )
}

export default Header
