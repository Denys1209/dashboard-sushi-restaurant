export interface FilterPaginationDto {
 searchTerm: string;
 pageNumber: number;
 pageSize: number;
 sortOrder: 0 | 1;
 sortColumn: string;
}