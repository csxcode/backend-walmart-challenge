import {injectable} from 'inversify';
import Koa from 'koa';
import {Response} from '../dtos/response.dto';

@injectable()
export abstract class BaseController {
  public errors: Array<any> = [];

  constructor() {
  }

  ok(res: Koa.Response, result:any) {
    this.response(res, 200, result, 'OK');
  }

  created(res: Koa.Response, result?:any) {
    this.response(res, 200, result);
  }

  forbidden(res: Koa.Response, message?: string) {
    this.response(res, 200, [], message ? message:'Forbidden');
  }

  notFound(res: Koa.Response, message?: string) {
    this.response(res, 404, [], message ? message : 'Not found');
  }

  conflict(res: Koa.Response, message?: string) {
    this.response(res, 409, [], message ? message : 'Conflict');
  }

  requestError(res: Koa.Response) {
    this.response(res, 422, [], String(), this.errors);
  }

  private response(res: Koa.Response, status: number, data?: any, message?: string, errors?:any) {
    res.status = status;
    res.body = new Response(message, data, errors);
  }    
}
