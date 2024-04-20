"use client"
import React, { useState } from 'react'
import ModalWindowForCreateCategory from '../ModalWindows/ModalWindowForCreateCategory';

const CreateCategoryButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal} className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">
                create a new category
            </button>
            <ModalWindowForCreateCategory isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default CreateCategoryButton