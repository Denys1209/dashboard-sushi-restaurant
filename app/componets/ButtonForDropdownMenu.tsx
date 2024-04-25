"use client"
import React, { useState } from 'react';

const ButtonForDropdownMenu = ({children} : {children:React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
       <div className="relative inline-block text-left">

    <div>
        <button
            type="button"
            className="inline-flex justify-center bg-black w-full rounded-md border border-gray-600 shadow-sm px-4 py-2  text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => setIsOpen(!isOpen)}
        >
        ...
        </button>
    </div>

    {isOpen && (
        <>
                <div className="fixed inset-0  transition-opacity" aria-hidden="true" onClick={() => setIsOpen(false)}></div>
        <div
            className="origin-top-right z-50 absolute right-0 mt-2  rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {children}
            </div>
        </div>

</>
    )}
</div>

    );
};

export default ButtonForDropdownMenu;
