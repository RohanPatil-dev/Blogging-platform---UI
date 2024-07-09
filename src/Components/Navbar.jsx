import React from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"

export default function Navbar() {

    const token = localStorage.getItem("uid")

    const navigate = useNavigate()

    function logout() {
        const logout = localStorage.removeItem("uid")

        navigate("/")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
                <Link className="navbar-brand" to="#">Blogger APP</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto" id="nav-li">
                        {
                            token ? <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/" onClick={() => { logout() }}>Logout</Link>
                                </li>
                            </> :
                                <>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Login</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/signup">Register</Link>
                                    </li>
                                </>
                        }

                    </ul>
                </div>
            </nav>

            <Outlet />
        </>
    )
}