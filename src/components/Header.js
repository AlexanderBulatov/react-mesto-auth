import logo from '../images/logo.svg';

import { NavBar } from './NavBar.js';

export function Header(props) {
  return (
    <header className="header page__header">
          <img
            src={logo}
            alt="Слово МЕСТО написано латинскими буквами"
            className="logo header__logo"
          />
          <NavBar loggedIn={props.loggedIn} signOut={props.handleLogOff} userData={props.userData}/>
    </header>
  )
}