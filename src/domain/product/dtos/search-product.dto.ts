import { PaginationPages } from '../../base/dtos/pagination.dto';

export interface SearchProductRequestDto extends PaginationPages {
  id: string | undefined  
  search: string | undefined  
}

export class SearchProductItemResponseDto {
  id: number | undefined;
  brand: string | undefined;   
  description: string | undefined;
  image: string | undefined;
  original_price: number | undefined;
  price: number | undefined;
  has_discount: boolean | undefined;
  discount_percentage: number | undefined;
  discount: number | undefined;
}
