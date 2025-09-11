import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert.jsx";

const Form = () => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        nickname: "",
        profilePicture: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,          // keep other fields unchanged
            [name]: value,    // update the field that changed
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [anonymous, setAnonymous] = useState(true);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/castsPage')
        const formData = {
            username: anonymous ? e.target.nickname.value : e.target.first_name.value + " " + e.target.last_name.value,
            // username: e.target.nickname.value ? e.target.nickname.value : e.target.first_name.value + " " + e.target.last_name.value,
            profilePicture: e.target.profilePicture.value
        }
        try {
            const response = await axios.post(' http://localhost:27601/user/', formData, {
                headers: {"Content-Type": "application/json"}
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    return (
        <div className=''>
            <form className="flex flex-col max-w-md mx-auto " onSubmit={handleSubmit}>
                {/* Radio buttons */}
                <div className='flex flex-col justify-center items-center self-center'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="profile_input_preview">
                        Add Profile Picture - (Optional)
                    </label>
                    <div className="relative w-28 h-28">
                        <input
                            type="file"
                            name='profilePicture'
                            id="profile_input_preview"
                            className="hidden"
                            value={formData.profilePicture}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="profile_input_preview"
                            className={`block w-full h-full cursor-pointer rounded-full transition-all duration-300 overflow-hidden group 
                            ${previewUrl ? 'border-2 border-solid border-transparent' : 'border-2 border-dashed border-gray-700 bg-gray-800 hover:border-blue-500'}`}
                        >
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 5-4V15z" clipRule="evenodd" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            )}
                        </label>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        id="default-radio-1"
                        type="radio"
                        value="anonymous"
                        name="default-radio"
                        checked={anonymous}
                        onChange={() => setAnonymous(true)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="default-radio-1"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Stay Anonymous
                    </label>
                </div>

                <div className="flex items-center mb-6">
                    <input
                        id="default-radio-2"
                        type="radio"
                        value="public"
                        name="default-radio"
                        checked={!anonymous}
                        onChange={() => setAnonymous(false)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="default-radio-2"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Let Everyone Know Me
                    </label>
                </div>

                {/* Conditional Fields */}
                {anonymous ? (
                    // Nickname input if anonymous
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.nickname}
                            onChange={handleChange}
                            required
                        />
                        <label
                            htmlFor="nickname"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nickname
                        </label>
                    </div>
                ) : (
                    // First + Last name if not anonymous
                    <>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                            <label
                                htmlFor="first_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                First name
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="last_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Last name
                            </label>
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Start
                </button>
            </form>
        </div>
    );
};

export default Form;
