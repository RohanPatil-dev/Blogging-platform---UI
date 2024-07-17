import React from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"

export default function Navbar(props) {

    const token = localStorage.getItem("uid")

    const navigate = useNavigate()

    function logout() {
        const logout = localStorage.removeItem("uid")

        navigate("/")
    }

    function turnOn() {
        props.colors === "light" ? props.setColors({ color: "dark", backgroundColor: "dark", text: "Dark mode enabled" }) : props.setColors({ color: "light", backgroundColor: "light", text: "Light Mode Enabled" })
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${props.colors} bg-${props.background} p-3 fontSize`} id="navbar">
                <Link className="navbar-brand" style={{ fontSize: "25px", fontWeight: "bold", fontStyle: "oblique" }} to="#"><span style={{ color: "red" }}>Blogger</span> APP</Link>
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


                                <li className="nav-item active ml-3 mt-1">
                                    <a to="#" style={{width : "170px",fontWeight : "600"}} className={`btn active text-${props.colors === "light" ? "dark" : "light"}`} role="button" aria-pressed="true" onClick={() => { turnOn() }}>{props.text}</a>
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