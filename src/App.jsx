import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from "./Components/SignUp.jsx";
import Blogs from "./Components/Blogs.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignUp/>} />
                <Route path="/castsPage" element={<Blogs/>} />
                {/*<Route path="/Casts" element={<h1>About</h1>} />*/}
                {/*<Route path="/PostCast" element={<h1>About</h1>} />*/}
            </Routes>
        </Router>
    )
}

export default App
