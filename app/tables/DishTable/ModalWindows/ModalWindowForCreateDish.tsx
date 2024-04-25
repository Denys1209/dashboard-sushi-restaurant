"use client"
import ModalWindowlayout from '@/app/componets/ModalWindowlayout';
import DishService from '@/services/DishService';
import React, { useState } from 'react';

const ModalWindowForCreateDish = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [categoryId, setCategoryId] = useState(0);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        DishService.createDish(
            categoryId,
            {
                name: name,
                cost: cost,
                description: description,
                imageURL: imageURL
            }
        );
        setName("");
        setCost(0);
        setDescription("");
        setImageURL("");
        setCategoryId(0);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalWindowlayout onClose={onClose}>
            <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                Enter category's name
            </h3>
            <div className="mt-2 w-full text-white">
                <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                    <label htmlFor="name" className="block mt-2">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <label htmlFor="cost" className="block mt-2">Cost</label>
                    <input
                        id="cost"
                        min={0}
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <label htmlFor="categoryId" className="block mt-2">Category ID</label>
                    <input
                        id="categoryId"
                        type="number"
                        min={0}
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <label htmlFor="description" className="block mt-2">Description</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <label htmlFor="imageURL" className="block mt-2">Image URL</label>
                    <input
                        id="imageURL"
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
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

export default ModalWindowForCreateDish;
