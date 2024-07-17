import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { ToastContainer, toast } from "react-toastify"

export default function Author(props) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [blog, setBlog] = useState([])

  useEffect(() => {
    renderBlog()
  }, [blog])


  const token = localStorage.getItem("uid")

  const data = {
    title: title,
    description: description
  }

  function postBlog(event) {
    event.preventDefault()
    try {

      axios.post("http://localhost:8081/blogs/addBlogs", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((value) => {
        console.log(value);
        toast.success("Blog added successfully !")
      })
    } catch (error) {
      toast.error(`Error is ${error}`)
    }
  }


  function renderBlog() {
    try {
      axios.get("http://localhost:8081/blogs/renderBlog", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((value) => {
        console.log(value.data.allData);
        setBlog(value.data.allData)
      })
    } catch (error) {
      toast.error(`Error is ${error}`)
    }
  }


  function deleteBlog(id) {
    try {
      axios.delete(`http://localhost:8081/blogs/deleteData/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((value) => {
        console.log(value);
        toast.success("Blog deleted successfully !")
      })
    } catch (error) {
      toast.error(`Error is ${error}`)
    }
  }


  return (
    <>
      <ToastContainer />
      <div className={`${props.colors === "light" ? "bg-light" : "bg-dark"} blog-writer-box`}>
        <div id="blog-writer" className={`${props.colors === "light" ? "text-dark" : "text-light"}`}>
          <form action="" onSubmit={postBlog}>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1" style={{ fontSize: "25px", fontWeight: "600" }}>Blog title</label>
              <input type="text" className="form-control" value={title} onChange={(event) => { return setTitle(event.target.value) }} id="exampleFormControlInput1" placeholder="Enter your blog title" />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1" style={{ fontSize: "25px", fontWeight: "600" }}>Blog Description</label>
              <textarea className="form-control" value={description} onChange={(event) => { return setDescription(event.target.value) }} id="exampleFormControlTextarea1" rows="3" style={{ height: "300px", overflow: "auto", resize: "none" }} placeholder="Enter your blog description"></textarea>
            </div>

            <button type="submit" className="btn btn-primary blogger">Submit</button>
          </form>
        </div>

        <div id="allBlogs">
          {
            blog.map((value) => {
              return (
                <>
                  <div className={`card ${props.colors === "light" ? "bg-light text-dark" : "bg-dark text-light border-light"}`} style={{ width: "18rem" }} key={value._id}>
                    <div className="card-body">
                      <h5 className="card-title">{value.title.slice(0, 30)}.....</h5>
                      <p className="card-text">{value.description.slice(0, 70)}.....</p>
                      <a href="#" className="btn btn-danger delete" onClick={() => { return deleteBlog(value._id) }}>Delete Blog</a>
                      <Link to={`/updateBlog/${value._id}`} className="btn btn-success ml-3 update">Update Blog</Link>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    </>
  )
}


