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
import { FilterPaginationDto } from '@/types/FilterPagination'
import CrudContextMenu from "@/app/componets/ButtonForDropdownMenu"
import { Combox } from '@/components/ui/combox'
import { ComboxProps } from '@/types/Combox'
import { PaginationLineProps } from '@/types/PaginationLine'
import PaginationLine from "@/app/componets/PaginationLine"
import InputFieldForNumber from "@/app/componets/InputFieldForNumber"
import { InputFieldForNumberProps } from '@/types/InputFieldForNumberProps'
import CreateOrderButton from "./Buttons/CreateOrderButton"
import OrderService from "@/services/OrderService"
import { GetOrderPageDto } from "@/types/Order"
import UpdateOrderButton from "./Buttons/UpdateOrderButton"
import DeleteOrderButton from "./Buttons/DeleteOrderButton"

const listOfColumn: ComboxProps = {
    listOfValue: [
        {
            label: "Id",
            value: "Id",
        },
        {
            label: "UserId",
            value: "UserId",
        },
        {
            label: "Cost",
            value: "Cost",
        },
        {
            label: "DateTime",
            value: "DateTime",
        },
        {
            label: "PhoneNumber",
            value: "PhoneNumber",
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
    const page: GetOrderPageDto = (await OrderService.getAllOrders(
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
                <CreateOrderButton />
            </div>
            <div className='overflow-y-scroll overflow-x-hidden flex-grow flex h-1'>
                <Table className='bg-black text-white flex-row flex-grow h-1' >
                    <TableHeader>
                        <TableRow className='grid-cols-3 grid-flow-row' >
                            <TableHead className="text-center">Id</TableHead>
                            <TableHead className="text-center">UserId</TableHead>
                            <TableHead className="text-center">Cost</TableHead>
                            <TableHead className="text-center">PhoneNumber</TableHead>
                            <TableHead className="text-center">DateTime</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='overflow-scroll '>
                        {page.orders.map((order) => (
                            <TableRow key={order.id} className="grid-cols-3" >
                                <TableCell className="text-center" >{order.id}</TableCell>
                                <TableCell className="text-center" >{order?.user?.id || "user isn't registered"}</TableCell>
                                <TableCell className="text-center" >{order.cost}</TableCell>
                                <TableCell className="text-center" >{order.phoneNumber}</TableCell>
                                <TableCell className="text-center" >{String(order.dateTime)}</TableCell>
                                <TableCell className="justify-center flex">
                                  <CrudContextMenu>
                                        <UpdateOrderButton
                                            order={order}
                                        />
                                        <DeleteOrderButton
                                            item={order}
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

