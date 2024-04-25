"use client"
import ModalWindowlayout from '@/app/componets/ModalWindowlayout';
import LoadingScreen from '@/app/componets/loadingScreen';
import CategoryService from '@/services/CategoryService';
import DishService from '@/services/DishService';
import { GetDishDto } from '@/types/Dish';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ModalWindowForUpdateDish = ({ isOpen, onClose, dish }: { isOpen: boolean, onClose: () => void, dish: GetDishDto }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(dish.name);
    const [cost, setCost] = useState(dish.cost);
    const [description, setDescription] = useState(dish.description);
    const [imageURL, setImageURL] = useState(dish.imageURL);
    const [categoryId, setCategoryId] = useState(dish.category.id);


    const handleSubmit = async (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        await DishService.updateDish(
            {
                id: dish.id,
                name: name,
                categoryId: categoryId,
                cost: cost,
                description: description,
                imageURL: imageURL,
            }
        );
        dish.category = (await CategoryService.getCategoryById(categoryId)).data
        router.refresh();
        onClose();
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <ModalWindowlayout onClose={onClose}>

            {isLoading ? <LoadingScreen></LoadingScreen> : <>
                <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                    Update category
                </h3>
                <div className="mt-2">
                    <form onSubmit={handleSubmit}>
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
            </>
            }
        </ModalWindowlayout>
    );
};

export default ModalWindowForUpdateDish;
