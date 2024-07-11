import axios from "axios";
import React,{useEffect, useState} from "react"

import { useParams } from "react-router-dom"

export default function Update() {

    const token = localStorage.getItem("uid")

        const [data, setData] = useState([])

    const [title, setTitle] = useState(data.title)
    const [description, setDescription] = useState(data.description)

    const {id} = useParams()

    console.log(data);
    console.log("title",title);
    console.log("description",description);


    // useEffect(()=>{
    //     blogData()
    //   },[])


    // function blogData() {
    //     const token = localStorage.getItem("uid")

    //     axios.get(`http://localhost:8081/blogs/singleData/${id}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     }).then((value)=>{
    //          console.log(value);
    //          setData(value.data.allData)
    //     })
    //   }
  

    function updateBlog() {
        axios.put(`http://localhost:8081/blogs/updateData/${id}`,{title : title,description : description},{
          headers : {
             Authorization : `Bearer ${token}`
          }
        }).then((value)=>{
            console.log("updated data",value);
        })
    }
    
  return (
    <div id="blog-writer">
    <form action="" onSubmit={updateBlog}>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" style={{ fontSize: "25px", fontWeight: "600" }}>Blog title</label>
        <input type="text" className="form-control" value={title} onChange={(event) => { return setTitle(event.target.value) }} id="exampleFormControlInput1" placeholder="Enter your blog title" />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1" style={{ fontSize: "25px", fontWeight: "600" }}>Blog Description</label>
        <textarea className="form-control" value={description} onChange={(event) => { return  setDescription(event.target.value) }} id="exampleFormControlTextarea1" rows="3" style={{ height: "300px", overflow: "auto", resize: "none" }} placeholder="Enter your blog description"></textarea>
      </div>

      <button type="submit" className="btn btn-primary blogger">Submit</button>
    </form>
  </div>
  )
}