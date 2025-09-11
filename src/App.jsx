import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from "./Components/SignUp.jsx";
import Blogs from "./Components/Blogs.jsx";
import PostCast from "./Components/PostCast.jsx";
import Layout from "./Components/Layout.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<SignUp/>} />
                    <Route path="/castsPage" element={<Blogs/>} />
                    <Route path="/postCast" element={<PostCast/>} />
                </Route>

                {/*<Route path="/Casts" element={<h1>About</h1>} />*/}
                {/*<Route path="/PostCast" element={<h1>About</h1>} />*/}
            </Routes>
        </Router>
    )
}

export default App
