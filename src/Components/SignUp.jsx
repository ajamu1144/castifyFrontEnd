import React from 'react'
import signUpImg from '../../public/signUpImg.jpg'
import Form from "./Form.jsx";
import Alert from "./Alert.jsx";
import axios from "axios";

const SignUp = () => {
    return (
        <div className='flex flex-col !mb-5 !px-10'>
            <Alert/>
            <h1 className='font-bold md:text-[3vw] text-[5vw] text-blue-600 mb-10 text-center'>
                Start Posting Casts, Stickers and Gists Anonymously
            </h1>
            <Form/>  <br/>
            <p className='text-center opacity-35'>Note: When you revisit this page, your information will be gone. Therefore making you anonymous</p>
        </div>
    )
}
export default SignUp