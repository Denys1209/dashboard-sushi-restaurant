"use client"
import React, { useState } from 'react'
import ModalWindowForCreateOrder from '../ModalWindows/ModalWindowForCreateOrder';

const CreateOrderButton = () => {
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
                create a new order
            </button>
            <ModalWindowForCreateOrder isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

export default CreateOrderButton