"use client"
import React, { useState } from 'react'
import ModalWindowForCreateUser from '../ModalWindows/ModalWindowForCreateUser';

const CreateUserButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={openModal} className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">
                create a new user
            </button>
            <ModalWindowForCreateUser isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

export default CreateUserButton