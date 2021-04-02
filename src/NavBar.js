import React, { Component } from "react"
import { Link } from "react-router-dom"
//import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar bg-danger text-black flex-md-nowrap p-0">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/">My Library</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/items">My Library</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tags">Tags TEST</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/collections">Collections TEST</Link>
                    </li> */}
                </ul>
                <span className="navbar-text ">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/logout">Log Out</Link>
                        </li>
                    </ul>
                </span>
            </nav>
        )
    }
}

export default NavBar