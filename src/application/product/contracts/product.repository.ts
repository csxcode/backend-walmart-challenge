import { PaginationSearchResult } from "../../../domain/base/dtos/pagination.dto";
import { ProductEntity } from "../../../domain/product";
import { SearchProductRequestDto } from "../../../domain/product/dtos/search-product.dto";

export interface IProductRepository {
  search(params: SearchProductRequestDto): Promise<PaginationSearchResult<ProductEntity>>;
}
