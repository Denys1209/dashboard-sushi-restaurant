"use client"
import { InputFieldForNumberProps } from '@/types/InputFieldForNumberProps';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const InputFieldForNumber = ({ props }: { props: InputFieldForNumberProps }) => {
    const router = useRouter();
    const [count, setCount] = useState(props.defaultValue);

    const handleChange = (e: any) => {
        setCount(e.target.value);
    };

    const handleUpdateParams = (value: string) => {

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(props.label, value);

        const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

        router.push(newPathName, { scroll: false });

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        handleUpdateParams(count);

    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder={props.placeholder}
                type="number"
                min="10"
                value={count}
                onChange={handleChange}
                className="rounded border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
            />
            <button type="submit" className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 ml-3 rounded">
                Submit
            </button>
        </form>
    );
}

export default InputFieldForNumber