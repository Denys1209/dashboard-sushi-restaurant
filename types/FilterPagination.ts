export interface FilterPaginationDto {
 searchTerm: string;
 pageNumber: number;
 pageSize: number;
 sortColumn: string;
 sortOrder: 'Asc' | 'Desc';
}