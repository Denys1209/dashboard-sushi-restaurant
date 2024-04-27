import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GetCategoryDto, GetCategoryPageDto } from '@/types/Category'
import CategoryService from '@/services/CategoryService'
import { FilterPaginationDto } from '@/types/FilterPagination'
import { Combox } from '@/components/ui/combox'
import { ComboxProps } from '@/types/Combox'
import { PaginationLineProps } from '@/types/PaginationLine'
import PaginationLine from "@/app/componets/PaginationLine"
import InputFieldForNumber from "@/app/componets/InputFieldForNumber"
import { InputFieldForNumberProps } from '@/types/InputFieldForNumberProps'
import CrudContextMenu from "@/app/componets/ButtonForDropdownMenu"
import CreateDishButton from "./Buttons/CreateDishButton"
import { GetDishPageDto } from "@/types/Dish"
import DishService from "@/services/DishService"
import UpdateDishButton from "./Buttons/UpdateDishButton"
import DeleteDishButton from "./Buttons/DeleteDishButton"

const listOfColumn: ComboxProps = {
    listOfValue: [
        {
            label: "Id",
            value: "Id",
        },
        {
            label: "Name",
            value: "Name",
        },
        {
            label: "Description",
            value: "Description",
        },
        {
            label: "Category",
            value: "Category",
        },
        {
            label: "Cost",
            value: "Cost",
        },
    ],
    placeholder: "select column",
    label: "sortColumn",
}

const listOfSortOrders: ComboxProps = {
    listOfValue: [
        {
            label: "Asc",
            value: "0",
        },
        {
            label: "Desc",
            value: "1",
        }
    ],
    placeholder: "select way of sort",
    label: "sortOrder",
}

const propsForPageSizeInputField: InputFieldForNumberProps = {
    defaultValue: "50",
    label: "pageSize",
    placeholder: "Page size",
}


export default async function Page({ searchParams }: { searchParams: FilterPaginationDto }) {

    const filter: FilterPaginationDto = {
        pageNumber: Number(searchParams?.pageNumber) || 1,
        pageSize: Number(searchParams?.pageSize) || 50,
        sortOrder: searchParams?.sortOrder || 0,
        searchTerm: searchParams?.searchTerm || '',
        sortColumn: searchParams?.sortColumn || 'id',
    };
    const page: GetDishPageDto = (await DishService.getAllDishes(
        filter
    )).data;

    const paginationProps: PaginationLineProps = {
        allPages: page.howManyPages,
        selectedPage: filter.pageNumber,
    }


    return (
        <div className='flex flex-col flex-1 justify-between h-[100vh] bg-black '>
            <div className='flex flex-row items-center justify-around h-[10vh] '>
                <Combox
                    props={listOfColumn}
                />
                <Combox
                    props={listOfSortOrders}
                />
                <InputFieldForNumber
                    props={propsForPageSizeInputField}
                />
                <CreateDishButton />
            </div>
            <div className='overflow-y-scroll overflow-x-hidden flex-grow flex h-1'>
                <Table className='bg-black text-white flex-grow h-1 flex-row' >
                    <TableHeader>
                        <TableRow className='grid-cols-3 grid-flow-row' >
                            <TableHead className="text-center">Id</TableHead>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">Category</TableHead>
                            <TableHead className="text-center">Cost</TableHead>
                            <TableHead className="text-center">Description</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='overflow-scroll '>
                        {page.dishes.map((dish) => (
                            <TableRow key={dish.id} className="grid-cols-3" >
                                <TableCell className="text-center" >{dish.id}</TableCell>
                                <TableCell className="text-center" >{dish.name}</TableCell>
                                <TableCell className="text-center" >{dish.category.name}</TableCell>
                                <TableCell className="text-center" >{dish.cost}</TableCell>
                                <TableCell className="text-center" >{dish.description}</TableCell>
                                <TableCell className="justify-center flex">
                                    <CrudContextMenu>
                                        <UpdateDishButton
                                            dish={dish}
                                        />
                                        <DeleteDishButton
                                            item={dish}
                                            page={page}
                                        />
                                    </CrudContextMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='flex justify-center bg-black text-white ' >
                <PaginationLine
                    props={paginationProps}
                />
            </div>
        </div>
    )
}

