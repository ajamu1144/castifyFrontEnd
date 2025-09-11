import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const NoCastsFound = () => {
    return (
        <div className="flex flex-col self-center items-center justify-center h-screen w-full p-8  text-center">
            <FaExclamationCircle
                className="text-gray-600 text-6xl mb-4 animate-bounce"
            />
            <h1 className="text-3xl font-bold text-gray-200 mb-2">
                No Casts Found
            </h1>
            <p className="text-gray-400 text-lg max-w-lg">
                It seems there are no casts available at the moment. Please check back later!
            </p>
        </div>
    );
};

export default NoCastsFound;