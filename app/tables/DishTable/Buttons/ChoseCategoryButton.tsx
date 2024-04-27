"use client"
import { GetCategoryDto } from '@/types/Category';
import React, { useState } from 'react'
import ModalWindowForChoiceCategory from '../ModalWindows/ModalWindowForChoiceCategory';

const ChoseCategoryButton = () => {

    const [category, setCategory] = useState<GetCategoryDto>(
        {
            id: -1,
            name: "nothing choosen",
        }
    );

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
                choosen category = {category.name}
            </button>
            <ModalWindowForChoiceCategory
                setCategory={setCategory}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    )
}

export default ChoseCategoryButton