"use client"
import ModalWindowlayout from '@/app/componets/ModalWindowlayout';
import CategoryService from '@/services/CategoryService';
import React, { useState } from 'react';

const ModalWindowForCreateCategory = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        CategoryService.createCategory(
            {
                name: name,
            }
        );
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalWindowlayout onClose={onClose}>
            <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                Enter category's name
            </h3>
            <div className="mt-2">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3  text-black leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Name"
                    />
                    <div className="mt-5">
                        <button
                            type="submit"
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </ModalWindowlayout>
    );
};

export default ModalWindowForCreateCategory;
