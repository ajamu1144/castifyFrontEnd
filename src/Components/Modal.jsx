import React from 'react';

const Modal = ({ onClose, comments }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10">
            <div className="relative w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-xl">
                <div className="flex items-start justify-between pb-3 border-b border-gray-700">
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
                    {comments && comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <p key={index} className="mb-2">{comment.comment}</p>
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