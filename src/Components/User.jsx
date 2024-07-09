import React, { useState, useEffect } from "react"

import {Link} from "react-router-dom"

import axios from "axios"

export default function User() {

  const [data, setData] = useState([])

  useEffect(() => {
    allBlogData()
  }, [])


  function allBlogData() {
    const token = localStorage.getItem("uid")

    axios.get("http://localhost:8081/blogs/getAllData", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      setData(value.data.allData)
    })
  }

  console.log("data", data);


  return (
    <>
      <div id="blog-cards">
        {data.map((value) => {
          return (
            <>
              <div className="card" style={{ width: "18rem" }} key={value._id}>
                <div className="card-body">
                  <h5 className="card-title">{value.title}</h5>
                  <p className="card-text">{value.description}</p>
                  <Link to={`/blogPage/${value._id}`} className="btn btn-primary" onClick={() => {console.log(value._id);}}>Read More</Link>
                </div>
              </div>
            </>
          )
        })}
      </div>



      {/* <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div> */}
    </>
  )
}