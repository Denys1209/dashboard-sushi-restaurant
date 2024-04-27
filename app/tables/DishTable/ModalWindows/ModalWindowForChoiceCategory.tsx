"use client"
import ModalWindowlayout from '@/app/componets/ModalWindowlayout'
import LoadingScreen from '@/app/componets/loadingScreen'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CategoryService from '@/services/CategoryService'
import { GetCategoryDto, GetCategoryPageDto } from '@/types/Category'
import React, { useState } from 'react'

const ModalWindowForChoiceCategory = ({ isOpen, onClose, setCategory }: { isOpen: boolean, onClose: () => void, setCategory: (category: GetCategoryDto) => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<GetCategoryDto[]>([]);
  const [name, setName] = useState('');


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setCategories((await CategoryService.getAllCategories(
      {
        pageNumber: 1,
        pageSize: 10,
        searchTerm: name,
        sortColumn: "Name",
        sortOrder: 1,
      }
    )).data.categories);
    setIsLoading(false);
  }

  return (
    <ModalWindowlayout onClose={onClose} >
      {isLoading ? <LoadingScreen /> : <>
        <h2>Search for category</h2>
        <form className='flex-row w-full' onSubmit={handleSubmit} >
          <label htmlFor="name" className="block mt-2">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
        <div className='overflow-y-scroll overflow-x-hidden flex-grow h-1 flex'>
          <Table className='bg-black text-white flex-grow h-1  flex-row' >
            <TableHeader>
              <TableRow className='grid-cols-3 grid-flow-row' >
                <TableHead className="text-center">Id</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='overflow-scroll '>
              {categories.map((category) => (
                <TableRow key={category.id} className="grid-cols-3" >
                  <TableCell className="text-center" >{category.id}</TableCell>
                  <TableCell className="text-center" >{category.name}</TableCell>
                  <TableCell className="justify-center flex">
                    <button
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => setCategory(category)}
                    >
                      choice
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
      }


    </ModalWindowlayout>
  )
}

export default ModalWindowForChoiceCategory