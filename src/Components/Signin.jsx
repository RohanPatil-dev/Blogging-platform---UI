import axios from "axios"
import React,{useState} from "react"
import { Link } from "react-router-dom"

import { useNavigate } from "react-router-dom"

export default function Signin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const data = {
        email : email,
        password : password
    }

    function signin(event) {
        event.preventDefault()

        axios.post("http://localhost:8081/login",data).then((value)=>{
            console.log(value);
            console.log("role is",value.data.role);
          
            localStorage.setItem("uid",value.data.token)

            if (value.data.role[0] === "blogger") {
                navigate("/author")
            }else{
                navigate("/user")
            }
        })
    }

    return (
        <>
           <div id="signin">
           <form onSubmit={signin}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" style={{fontSize : "20px"}}>Email address</label>
                    <input type="email" name="email" value={email} onChange={(event)=>{return setEmail(event.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" style={{fontSize : "20px"}}>Password</label>
                    <input type="password" name="password" value={password} onChange={(event)=>{return setPassword(event.target.value)}}  className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <p>Don't have acount ? <Link to="/signup">Register here</Link></p>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
           </div>
        </>
    )
}