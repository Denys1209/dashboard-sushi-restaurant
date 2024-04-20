"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationLineProps } from "@/types/PaginationLine"
import { useRouter } from "next/navigation";


function generateLinks(props: { allPages: number, selectedPage: number }) {
    let links: string[] = []
    if (props.allPages <= 3) {
        for (let i = 1; i <= props.allPages; ++i) {
            links.push(String(i));
        }
    }
    else if (props.selectedPage + 1 > props.allPages) {
        for (let i = props.allPages - 2; i <= props.selectedPage; ++i) {
            links.push(String(i));
        }
    }
    else if (props.selectedPage - 1 <= 0) {
        for (let i = 1; i <= 3; ++i) {
            links.push(String(i));
        }
    }
    else {
        for (let i = props.selectedPage - 1; i <= props.selectedPage + 1; ++i) {
            links.push(String(i));
        }
    }
    return links;
}

const PaginationLine = ({ props }: { props: PaginationLineProps }) => {
    const router = useRouter();
    const isShowThreeDots = props.selectedPage + 2 > props.allPages ? false : true;

    let links: string[] = generateLinks({
        allPages: props.allPages,
        selectedPage: props.selectedPage,
    });

    

    const handleUpdateParams = (value: string) => {

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("pageNumber", value);

        const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

        router.push(newPathName, { scroll: false });

    }


    const handleNext = () => {
        if (props.selectedPage + 1 <= props.allPages) {
            handleUpdateParams(String(props.selectedPage + 1));
        }
    }

    const handlePrev = () => {
        if (props.selectedPage - 1 >= 1) {
            handleUpdateParams(String(props.selectedPage - 1));
        }
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem onClick={handlePrev}>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                {
                    links.map(
                        (e, idx) => {
                            if (Number(e) === props.selectedPage) {
                                return <PaginationItem key={idx} onClick={() => handleUpdateParams(e)}>
                                    <PaginationLink href="#" isActive className="bg-black text-white">{e}</PaginationLink>
                                </PaginationItem>
                            }
                            else {
                                return <PaginationItem key={idx} onClick={() => handleUpdateParams(e)}>
                                    <PaginationLink href="#" >{e}</PaginationLink>
                                </PaginationItem>
                            }
                        }
                    )
                }
                {
                    isShowThreeDots ? <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem> : <></>
                }

                <PaginationItem onClick={handleNext}>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationLine