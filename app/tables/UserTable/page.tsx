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
import CreateUserButton from "./Buttons/CreateUserButton"
import CrudContextMenu from "@/app/componets/ButtonForDropdownMenu"
import DeleteUserButton from "./Buttons/DeleteUserButton"
import UpdateUserButton from "./Buttons/UpdateUserButton"
import { GetUserPageDto } from "@/types/User"
import UserService from "@/services/UserService"

const listOfColumn: ComboxProps = {
    listOfValue: [
        {
            label: "id",
            value: "id",
        },
        {
            label: "username",
            value: "username",
        },
        {
            label: "gmail",
            value: "gmail",
        },
        {
            label: "isVerify",
            value: "isVerify",
        },
        {
            label: "role",
            value: "role",
        }
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
    const page: GetUserPageDto = (await UserService.getAllUsers(
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
                <CreateUserButton />
            </div>
            <div className='overflow-y-scroll overflow-x-hidden flex-grow flex h-1'>
                <Table className='bg-black text-white flex-row flex-grow h-1' >
                    <TableHeader>
                        <TableRow className='grid-cols-3 grid-flow-row' >
                            <TableHead className="text-center">Id</TableHead>
                            <TableHead className="text-center">Username</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                            <TableHead className="text-center">IsVerify</TableHead>
                            <TableHead className="text-center">Role</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='overflow-scroll '>
                        {page.users.map((user) => (
                            <TableRow key={user.id} className="grid-cols-3" >
                                <TableCell className="text-center" >{user.id}</TableCell>
                                <TableCell className="text-center" >{user.username}</TableCell>
                                <TableCell className="text-center" >{user.email}</TableCell>
                                <TableCell className="text-center" >{String(user.isVerify)}</TableCell>
                                <TableCell className="text-center" >{user.role}</TableCell>
                                <TableCell className="justify-center flex">
                                    <CrudContextMenu>
                                        <UpdateUserButton
                                            user={user}
                                        />
                                        <DeleteUserButton
                                            item={user}
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

