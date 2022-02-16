import {inject, injectable} from 'inversify'
import {TYPES} from '../../../adapters/types/inversify.types'
import {PaginationResponseDto, PaginationSearchResult} from '../../../domain/base/dtos/pagination.dto'
import {ProductEntity} from '../../../domain/product'
import {SearchProductItemResponseDto, SearchProductRequestDto} from '../../../domain/product/dtos/search-product.dto'
import { Helper } from '../../shared/helpers'
import {IProductRepository} from '../contracts/product.repository'

@injectable()
export class SearchProductUseCase {

  private readonly discountPercentageForPalindrome: number = 50;
  private params!: SearchProductRequestDto

  constructor(
    @inject(TYPES.ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(params: SearchProductRequestDto): Promise<PaginationResponseDto<SearchProductItemResponseDto>> {
    
    this.params = Helper.setPaginateLimitsByDefault(params);

    const data: PaginationSearchResult<ProductEntity> = await this.productRepository.search(this.params);        
    const items = this.getItems(data.items);    

    return new PaginationResponseDto<SearchProductItemResponseDto>(items, data.page, data.limit, data.total);        
  }

  private getItems(items: ProductEntity[]): SearchProductItemResponseDto[] {
    return items.map((item: ProductEntity) => {
      
      const isPalindrome = this.verifyPalindromeValues(item);           
      const {newPrice, discount, discountPercentage, hasDiscount} = this.calculateNewValues(isPalindrome, item.price as number);      
            
      let dto: SearchProductItemResponseDto = new SearchProductItemResponseDto();      
      dto.id = item.id;
      dto.brand = item.brand;
      dto.description = item.description;
      dto.image = item.image;
      dto.original_price = item.price;
      dto.price = newPrice;
      dto.has_discount = hasDiscount;
      dto.discountPercentage = discountPercentage;
      dto.discount = discount;

      return dto;      
    })
  }

  private calculateNewValues(isPalindrome: boolean, price: number): any {
    let newPrice = price;
    let discount = 0;
    let discountPercentage = 0;
    let hasDiscount = false;

    if(!isPalindrome)
      return {newPrice, discount, discountPercentage, hasDiscount};

    newPrice = (this.discountPercentageForPalindrome / 100 ) * (price as number);
    discount = (price as number) - newPrice;
    discountPercentage = this.discountPercentageForPalindrome;
    hasDiscount = true;

    return {newPrice, discount, discountPercentage, hasDiscount}
  } 

  private verifyPalindromeValues(item: ProductEntity): boolean {

    let valueFromRequest: string;
    let valueFromDb: string;    
    let thereAreParamValidsForVerify = this.verifyValueIsValid(this.params.id!) || this.verifyValueIsValid(this.params.search!);

    if(!thereAreParamValidsForVerify) 
      return false;

    // Check By: ID
    valueFromRequest = this.params.id!;
    valueFromDb = (item.id as unknown) as string;
    if(this.paramEnteredIsPalindrome(valueFromRequest, valueFromDb, true))    
        return true;
    
    // Check By: Brand
    valueFromRequest = this.params.search as string;
    valueFromDb = (item.brand as unknown) as string;
    if(this.paramEnteredIsPalindrome(valueFromRequest, valueFromDb, false))    
        return true;    

    // Check By: Description
    valueFromRequest = this.params.search as string;
    valueFromDb = (item.description as unknown) as string;
    if(this.paramEnteredIsPalindrome(valueFromRequest, valueFromDb, false))          
        return true;    
  
    return false;    
  }

  private paramEnteredIsPalindrome(valueFromRequest: string, valueFromDb: string, matchAllChars: boolean): boolean {
    const isValid: boolean = this.verifyValueIsValid(valueFromRequest);

    if(!isValid)
      return false;

    valueFromRequest = valueFromRequest.trim();

    if(matchAllChars) {
      if(valueFromRequest == valueFromDb)
      {                   
        if(Helper.isPalindrome(valueFromRequest))
          return true;
      }
    } else {      
      if(valueFromDb.toLocaleLowerCase().includes(valueFromRequest.toLowerCase()))
      {              
        if(Helper.isPalindrome(valueFromRequest))
          return true;
      }
    }

    return false;   
  }

  private verifyValueIsValid(value: string) {
    return (value !== undefined && value !== null && value !== '')
  }
}
