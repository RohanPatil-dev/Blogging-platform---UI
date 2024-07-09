import React from "react"
import Signin from "./Signin"

import "../CSS/Style.css"
import SignUp from "./SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Author from "./Author"
import User from "./User"
import Blogpage from "./Blogpage"

export default function Main() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/author" element={<Author />} />
            <Route path="/user" element={<User />} />
            <Route path="/blogPage/:id" element={<Blogpage />} />
          </Route>

          {/* <Route path="/author" element={<Author />} />
          <Route path="/user" element={<User />} />
          <Route path="/blogPage/:id" element={<Blogpage />} /> */}
        </Routes>
      </BrowserRouter>

    </>
  )
}