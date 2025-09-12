import React from 'react'
import {FaComment} from "react-icons/fa";
import {FaRegComment} from "react-icons/fa";

const CastCard = ({castTitle, castContent, castAuthor, func}) => {
    return (
        <div
            className="flex relative flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{castTitle}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-200 w-[100px]">{castContent}</p>
            <p className='text-gray-700 dark:text-gray-400'>By: {castAuthor}</p>
            <FaRegComment onClick={func} className='absolute -bottom-[10px] rounded-full text-white cursor-pointer scale-125' />
        </div>
    )
}
export default CastCard
