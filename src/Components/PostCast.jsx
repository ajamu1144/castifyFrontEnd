import React, { useState } from "react";
import axios from "../../Config/axios.config.js";
import Loader from "./Loader.jsx";
import SuccessToast from "./SuccessToast.jsx";
import NetworkErrorToast from "./NetworkErrorToast.jsx";

const PostCast = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [cast, setCast] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [castError, setCastError] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim().length < 1) {
            setTitleError(true);
            return;
        }
        if (cast.trim().length < 1) {
            setCastError(true);
            return;
        }
        setLoading(true); // ✅ start loader before request
        setTitleError(false);
        setCastError(false);
        try {
            const res = await axios.post("/cast", { title, cast });
            console.log(res.data);
            setTitle("");
            setCast("");

            setSuccess(true);
            setError(false);
        } catch (err) {
            setSuccess(false);
            setError(true);
            console.error(err);


        } finally {
            setLoading(false); // ✅ stop loader
        }
    };

    return (
        <div className="px-6 md:px-[200px]">
            {
                success &&
                <SuccessToast/>
            }
            {
                error &&
                <NetworkErrorToast/>
            }
            {loading && <Loader />}

            <h1 className="font-bold md:text-[3vw] text-[5vw] text-blue-600 mb-10 text-center">
                Enter the cast jorrr!!!
            </h1>

            <form className="w-full" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        id="title"
                        name="title"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        maxLength="40"
                        required
                    />
                    <label
                        htmlFor="title"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform
            -translate-y-6 scale-75 top-3 -z-10 origin-[0]
            peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
            peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Cast Title
                    </label>
                    {
                        titleError &&
                        <p className='text-red-500'>The cast title can't be empty</p>
                    }
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <label
                        htmlFor="castContent"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your message
                    </label>
                    <textarea
                        id="castContent"
                        rows="4"
                        value={cast}
                        onChange={(e) => setCast(e.target.value)}
                        className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="cast"
                        required
                        placeholder="Enter the Cast"
                    />
                    {
                        castError &&
                        <p className='text-red-500'>The cast can't be empty</p>
                    }
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default PostCast;
