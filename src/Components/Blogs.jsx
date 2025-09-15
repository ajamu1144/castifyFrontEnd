import React, { useState, useEffect } from 'react';
import axios from "../../Config/axios.config.js";
import Modal from './Modal.jsx'
import { FaRegComment } from "react-icons/fa";
import NoCastsFound from "./NoCasts.jsx";
import {Link} from "react-router-dom";
import CastCard from "./CastCard.jsx";

const Blogs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allCasts, setAllCasts] = useState([]);
    const [selectedCastId, setSelectedCastId] = useState(null); // Changed to store castId

    const fetchData = async () => {
        try {
            const response = await axios.get('/casts');
            setAllCasts(response.data);
        } catch (err) {
            console.error(`An Error Occurred: ${err}`);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const openModalWithComments = (castId) => {
        setSelectedCastId(castId); // Store castId instead of comments
        setIsModalOpen(true);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (isModalOpen) {
            setSelectedCastId(null); // Clear castId when closing
        }
    };

    return (
        <div className='flex flex-col'>
            <button className='!mt-10 transtion-all cursor-pointer duration-150 self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                <Link to='/postCast' >
                    Post Your Own Cast
                </Link>
            </button>
            <div className='castsContainer'>
                {
                    allCasts.length !== 0 ?
                        allCasts.map(cast => {
                            return (
                                <CastCard
                                    commentCount={cast.comments}
                                    key={cast._id} // Added key for React list rendering
                                    castAuthor={cast.author}
                                    castTitle={cast.title}
                                    castContent={cast.cast}
                                    func={() => openModalWithComments(cast._id)} // Pass castId
                                />
                            );
                        })
                        :
                        <NoCastsFound/>
                }
                {isModalOpen && <Modal onClose={toggleModal} castId={selectedCastId} />}
            </div>
        </div>
    );
};

export default Blogs;