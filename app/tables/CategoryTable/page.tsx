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
import CreateCategoryButton from "./Buttons/CreateCategoryButton"
import { ContextMenu } from "@/components/ui/context-menu"

const listOfColumn: ComboxProps = {
    listOfValue: [
        {
            label: "id",
            value: "id",
        },
        {
            label: "name",
            value: "name",
        }
    ],
    placeholder: "select column",
    label: "SortColumn",
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
    label: "SortOrder",
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
        sortOrder: searchParams?.sortOrder || 'Asc',
        searchTerm: searchParams?.searchTerm || '',
        sortColumn: searchParams?.sortOrder || 'id',
    };
    const page: GetCategoryPageDto = (await CategoryService.getAllCategories(
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
                <CreateCategoryButton />
            </div>
            <div className='overflow-y-scroll overflow-x-hidden flex-grow h-1'>
                <Table className='bg-black text-white ' >
                    <TableHeader>
                        <TableRow className='w-full'>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead className="text-center">name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='overflow-scroll'>
                        {page.categories.map((category) => (
                            <ContextMenu.Root key={category.id}>
                                <ContextMenu.Trigger asChild>
                                    <TableRow >
                                        <TableCell className="font-medium">{category.id}</TableCell>
                                        <TableCell className="text-center">{category.name}</TableCell>
                                    </TableRow>
                                </ContextMenu.Trigger>
                                <ContextMenu.Content>
                                    <ContextMenu.Item onSelect={() => console.log('Update')}>
                                        Update
                                    </ContextMenu.Item>
                                    <ContextMenu.Item onSelect={() => console.log('Delete')}>
                                        Delete
                                    </ContextMenu.Item>
                                </ContextMenu.Content>
                            </ContextMenu.Root>
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