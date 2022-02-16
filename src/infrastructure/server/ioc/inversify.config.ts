import {Container} from 'inversify'
import {interfaces, TYPE} from 'inversify-koa-utils'

import {TYPES} from '../../../adapters/types/inversify.types'
import {IProductRepository} from '../../../application/product/contracts/product.repository'
import {SearchProductUseCase} from '../../../application/product/useCases/search-product'

import {ProductMongoRepository} from '../../db/mongodb/repositories/product.repository'
import {ProductController} from '../../server/controllers/product.controller'

export class DIContainer {
  public container: Container = new Container()

  constructor() {
    this.configure()
  }

  public configure() {
    this.configureControllers()
    this.configureUseCases()
    this.configureMongoDbRepositories()
  }

  private configureControllers() {
    this.container.bind<interfaces.Controller>(TYPE.Controller).to(ProductController).whenTargetNamed('ProductController')
  }

  private configureUseCases() {
    this.container.bind<SearchProductUseCase>(TYPES.SearchProductUseCase).to(SearchProductUseCase)
  }

  private configureMongoDbRepositories() {
    this.container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductMongoRepository)
  }  
}
