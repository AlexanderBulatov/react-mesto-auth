import React from 'react';
import { Link,  useNavigate } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom';


export function NavBar(props) {


  const navigate = useNavigate();

  function signOut(){
    localStorage.removeItem('jwt');
    props.signOut();
  }

  return (
    // <nav className="header__menu">
    //   <Link to="/sign-in" className="header__link">Регистрация</Link>
    //   <div className="header__currentUser">Какая-то переменная</div>
    //   <Link to="/sign-up" className="header__link">Войти</Link>
    // </nav>


    <nav className="header__menu">
      {!props.loggedIn && <>
        <NavLink to="/sign-in" className={({ isActive }) => `header__link ${isActive ? "header__link_disabled" : ""}`}>Войти</NavLink>
        <NavLink to="/sign-up" className={({ isActive }) => `header__link ${isActive ? "header__link_disabled" : ""}`}>Регистрация</NavLink>
      </>
      }

      {props.loggedIn && <>
        <div className="header__currentUser">{props.userData}</div>
        <Link to="/sign-in" className="header__link header__link_logged" onClick={signOut}>Выйти</Link>
      </>
      }
    </nav>
  );
}
