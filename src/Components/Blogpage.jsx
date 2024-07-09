import axios from "axios";
import React,{useState,useEffect} from "react"

import { useParams } from "react-router-dom"

export default function Blogpage() {

  const [data, setData] = useState([])

  useEffect(()=>{
    blogData()
  },[])

    // const params = useParams()

    //   console.log("userparam",params);

    //   let value = JSON.stringify(params.id)

    //   console.log("real",value);

    const {id} = useParams()

      function blogData() {
        const token = localStorage.getItem("uid")

        axios.get(`http://localhost:8081/blogs/singleData/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((value)=>{
             console.log(value);
             setData(value.data.allData)
        })
      }
    
     

  return (
    <>
       <div className="blog">
            <div className="title">{data.title}</div>

            <div className="description">{data.description}</div>
       </div>
    </>
  )
}