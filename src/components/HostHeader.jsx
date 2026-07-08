import { NavLink } from "react-router-dom"

export default function HostHeader() {
    const styles = {textDecoration : "underline" , color : "#161616" , fontWeight:"bold"}

    return (
        <header>
            <nav className="host-nav">
                <NavLink to="." end style={({isActive}) => isActive ? styles : null}>Dashboard</NavLink>
                <NavLink to="income" style={({isActive}) => isActive ? styles : null}>Income</NavLink>
                <NavLink to="vans" style={({isActive}) => isActive ? styles : null}>Vans</NavLink>
                <NavLink to="reviews" style={({isActive}) => isActive ? styles : null}>Reviews</NavLink>
            </nav>
        </header>
    )
}
