import {Request, Response} from 'koa'
import {inject, injectable} from 'inversify'
import {interfaces, controller, httpGet, request, response} from 'inversify-koa-utils'
import {TYPES} from '../../../adapters/types/inversify.types'
import {BaseController} from './base.controller'
import {SearchProductUseCase} from '../../../application/product/useCases/search-product'
import { SearchProductRequestDto } from '../../../domain/product/dtos/search-product.dto'

@controller('/products')
@injectable()
export class ProductController extends BaseController implements interfaces.Controller {
  constructor(
    @inject(TYPES.SearchProductUseCase)
    private searchProductUseCase: SearchProductUseCase,
  ) {
    super()
  }

  @httpGet('/search')
  async search(@request() req: Request, @response() res: Response) {       
     
    let params: SearchProductRequestDto = {
      id: req.query.id as string,
      search: req.query.search as string,
      page: req.query.page as string,
      limit: req.query.limit as string,
    };        
  
    const result = await this.searchProductUseCase.execute(params)
    return this.ok(res, result)
  }
}
