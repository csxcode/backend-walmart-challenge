export interface IResponseError {
  message: string;
  property: string;
}

export class Response {
  code?: number;
  message?: string;
  data?: any;
  errors?: Array<IResponseError>;

  constructor(message?: string, data?: any, errors?: Array<IResponseError>) {
    this.message = message;
    this.data = data || [];
    this.errors = errors || [];
  }
}