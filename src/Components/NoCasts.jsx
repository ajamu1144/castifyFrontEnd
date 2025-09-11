import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import {Link} from "react-router-dom";

const NoCastsFound = () => {
    return (
        <div className="flex flex-col self-center lg:w-[95vw] items-center justify-center p-8 text-center">
            <FaExclamationCircle
                className="text-gray-600 text-6xl mb-4 animate-bounce"
            />
            <h1 className="text-3xl font-bold text-gray-200 mb-2">
                No Casts Found
            </h1>
            <p className="text-gray-400 text-lg max-w-lg">
                It seems there are no casts available at the moment. Please check back later!. Or become the first one to post a cast.
            </p>
            <button className='!mt-10 transtion-all cursor-pointer duration-150 self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                <Link to='/postCast' >
                    Post Your Own Cast
                </Link>
            </button>
        </div>
    );
};

export default NoCastsFound;