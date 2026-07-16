import React from 'react'
import { Link , NavLink} from 'react-router-dom'
import avatarImg from "../assets/images/avatar-icon.png"


export default function Header() {
    function fakeLogout() {
        localStorage.removeItem("loggedIn")
    }
    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>

            <nav>
                <NavLink className={({isActive}) => {return isActive ? "active-link" : null}} to="host">Host</NavLink>
                <NavLink className={({isActive}) => {return isActive ? "active-link" : null}} to="about">About</NavLink>
                <NavLink className={({isActive}) => {return isActive ? "active-link" : null}} to="vans">Vans</NavLink>
                <Link to="login" className="login-link">
                    <img 
                        src={avatarImg} 
                        className="login-icon"
                    />
                </Link>
                <button onClick={fakeLogout}>X</button>
            </nav>
        </header>
    )
}
