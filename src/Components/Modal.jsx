import React, { useState, useEffect } from 'react';
import axios from '../../Config/axios.config.js';
import CommentForm from "./CommentForm.jsx";
import Loader from "./Loader.jsx";

const Modal = ({ onClose, castId }) => {
    const [allComments, setAllComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState("");

    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/comment/${castId}`);
            setAllComments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (castId) {
            fetchComments();
        }
    }, [castId]);

    const handleCommentsubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setLoading(true);
        try {
            await axios.post(`/comment/${castId}`, { text: newComment });
            setNewComment("");
            fetchComments(); // Refresh comments after posting
            setLoading(false);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10">
            {
                loading &&
                <Loader/>
            }
            <div className="relative w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-xl">
                <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-white">
                        Comments
                    </h3>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className="py-4 text-gray-400">
                    <CommentForm newComment={newComment} func={handleCommentsubmit} setNewComment={setNewComment} />
                    {allComments && allComments.length > 0 ? (
                        allComments.map((comment, index) => (
                            <div key={index} className="mb-2 overflow-y-scroll" style={{maxHeight: '200px', overflowY: 'scroll' , overflowX: 'hidden'}}>
                                <p > {comment.text}</p>
                                <hr/>
                            </div>
                        ))
                    ) : (
                        <p>No comments available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;