import React,{useState} from "react"

import { useNavigate } from "react-router-dom"

import axios from "axios"

export default function SignUp() {


    const navigate = useNavigate();

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    console.log("userName : "+userName," email : "+email,"password : "+password,"role : ",role);

    const data = {
       username : userName,
       email : email,
       password : password,
       role : role
    }

    function registration(event) {
        event.preventDefault()
       let result = axios.post("http://localhost:8081/register",data)
   
       if (result) {
        navigate("/")
       }
    }

    return (
        <div id="signup">
            <form onSubmit={registration}>
                <div className="form-group">
                    <label htmlFor="exampleInputUserName1" style={{ fontSize: "20px" }}>Username</label>
                    <input type="text" value={userName} onChange={(event)=>{return setUserName(event.target.value)}} name="username" className="form-control" id="exampleInputUserName1" aria-describedby="emailHelp" placeholder="Enter Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" style={{ fontSize: "20px" }}>Email address</label>
                    <input type="email" value={email} onChange={(event)=>{return setEmail(event.target.value)}} name="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" style={{ fontSize: "20px" }}>Password</label>
                    <input type="password" value={password}  onChange={(event)=>{return setPassword(event.target.value)}} name="password"  className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1" style={{ fontSize: "20px" }}>Select Role</label>
                    <select className="form-control" id="exampleFormControlSelect1" value={role}  onChange={(event)=>{return setRole(event.target.value)}}>
                        <option value={"user"}>user</option>
                        <option value={"blogger"}>blogger</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}