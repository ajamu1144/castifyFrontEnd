import React, { useState, useEffect } from 'react';
import axios from "axios";
import Modal from './Modal.jsx'
import { FaRegComment } from "react-icons/fa";
import NoCastsFound from "./NoCasts.jsx";

const Blogs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allBlogs, setAllBlogs] = useState([]);
    const [selectedComments, setSelectedComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:27601/casts/');
                setAllBlogs(response.data);
            } catch (err) {
                console.error(`An Error Occurred: ${err}`);
            }
        };
        fetchData();
    }, []); // Empty dependency array ensures this runs only once

    const openModalWithComments = (comments) => {
        setSelectedComments(comments);
        setIsModalOpen(true);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        // Clear comments when closing the modal
        if (isModalOpen) {
            setSelectedComments([]);
        }
    };

    return (
        <div className='castsContainer'>
            {
                allBlogs.length !== 0 ?
                allBlogs.map(cast => {
                    return (
                        <div
                            key={cast.id} // Add a unique key prop
                            className="flex relative flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cast.title}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-200">{cast.cast}</p>
                            <p className='text-gray-700 dark:text-gray-400'>By: {cast.author}</p>
                            <FaRegComment
                                onClick={() => openModalWithComments(cast.comments)}
                                className='absolute bottom-4 right-4 rounded-full text-white cursor-pointer scale-125'
                            />
                        </div>
                    );
                })
                    :
                <NoCastsFound/>
            }
            {isModalOpen && <Modal onClose={toggleModal} comments={selectedComments} />}
        </div>
    );
};

export default Blogs;