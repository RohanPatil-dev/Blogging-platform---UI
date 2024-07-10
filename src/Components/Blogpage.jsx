import axios from "axios";
import React, { useState, useEffect } from "react"

import { useParams } from "react-router-dom"

export default function Blogpage() {

  const [data, setData] = useState([])

  const [comments, setComments] = useState([])

  const [addComment, setAddComments] = useState("")

  useEffect(() => {
    blogData()
    showComments()
  }, [comments])

  // const params = useParams()

  //   console.log("userparam",params);

  //   let value = JSON.stringify(params.id)

  //   console.log("real",value);

  const { id } = useParams()
  const token = localStorage.getItem("uid")


  function blogData() {
    axios.get(`http://localhost:8081/blogs/singleData/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      console.log(value);
      setData(value.data.allData)
    })
  }

  const value = {
    content: addComment
  }

  function addComments() {
    axios.post(`http://localhost:8081/comments/blog/${id}/reviews`, value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      console.log(value);
    })
  }

  function showComments() {
    axios.get(`http://localhost:8081/comments/blog/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      console.log(value.data);
      setComments(value.data)
    })
  }

  return (
    <>
      <div className="blog">
        <div className="title">{data.title}</div>

        <div className="description">{data.description}</div>
      </div>

      <div id="comments">
        <form onSubmit={addComments}>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1" style={{ fontSize: "25px", fontWeight: "600" }}>Write comments</label>
            <textarea className="form-control" value={addComment} onChange={(event) => { return setAddComments(event.target.value) }} style={{ overflow: "auto", resize: "none" }} placeholder="Enter your comments..............."></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "200px", padding: "5px", fontSize: "20px" }}>Submit</button>

        </form>
      </div>

      <div className="comments">
        {
          comments == [] ? "Empty comments" :
            comments.map((value) => {
              return (
                <>
                  <div className="comment-box">
                    <p>USER ID : <span>{value._id}</span></p>
                    <p>USER COMMENT : <span>{value.content}</span></p>
                  </div>
                </>
              )
            })
        }
      </div>
    </>
  )
}