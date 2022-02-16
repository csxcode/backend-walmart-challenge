import {injectable} from 'inversify'
import {IProductRepository} from '../../../../application/product/contracts/product.repository'
import {PaginationSearchResult} from '../../../../domain/base/dtos/pagination.dto'
import {ProductEntity} from '../../../../domain/product'
import {SearchProductRequestDto} from '../../../../domain/product/dtos/search-product.dto'
import ProductSchema from '../schemas/product.schema'

@injectable()
export class ProductMongoRepository implements IProductRepository {
  async search(params: SearchProductRequestDto): Promise<PaginationSearchResult<ProductEntity>> {    
    const {page, limit} = params    
    let query: any = {};

    if(params.search) {
      query = { 
        $or: [
          { brand: { $regex: params.search, $options: "i" } },
          { description: { $regex: params.search, $options: "i" } },
        ],
       }
    }    

    if(params.id) {      
      if(Number(params.id)) {
        query.id = { $eq: parseInt(params.id as string) } ;
      } else {
        query.id = { $eq: 0 } ;
      }
    }            

    const products: any = await ProductSchema.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await ProductSchema.find(query).countDocuments()
    return new PaginationSearchResult<ProductEntity>(products, page, limit, count)
  }
}
