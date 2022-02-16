export class PaginationPages {
  page: any;
  limit: any;  
}

export class PaginationSearchResult<T> {
  items: T[] = [];
  page: number = 0;
  limit: number = 0;
  total: number = 0;

  constructor(items: T[], page: number, limit: number, total: number) {
    this.items = items;
    this.page = page;
    this.limit = limit;
    this.total = total;
  }
}

// Responses
export interface MetaPaginationResponseDto {
  current_page: number,
  items_per_page: number,
  total_items: number,
  total_pages: number,  
}

export class PaginationResponseDto<T> {
  items: T[];
  meta: MetaPaginationResponseDto;

  constructor(items: T[], page: number, limit: number, totalItems: number) {
    this.items = items;
    this.meta = {
      current_page: page,
      items_per_page: limit,
      total_items: totalItems,
      total_pages: Math.ceil(totalItems/limit),      
    };
  }
}
