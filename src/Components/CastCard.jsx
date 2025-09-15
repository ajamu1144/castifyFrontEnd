import React from 'react'
import {FaRegComment} from "react-icons/fa";

const CastCard = ({castTitle, castContent, castAuthor, func, commentCount}) => {
    return (
        <div
            className="flex relative flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{castTitle}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-200">{castContent}</p>
            <p className='text-gray-700 dark:text-gray-400'>By: {castAuthor}</p>
            <div className='flex '>
                <FaRegComment
                    onClick={func}
                    className='absolute bottom-4 right-4 rounded-full text-white cursor-pointer scale-125'
                /><p className='absolute bottom-4 right-10 rounded-full text-white cursor-pointer scale-125'>{commentCount}</p>
            </div>
        </div>
    )
}
export default CastCard