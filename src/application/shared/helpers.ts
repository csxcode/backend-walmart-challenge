import { Pagination } from "../../domain/shared/constants";

export class Helper {
  static setPaginateLimitsByDefault(params: any) {
    let {page, limit} = params
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : Pagination.PAGE_LIMIT;

    if(limit > Pagination.PAGE_LIMIT)
      limit = Pagination.PAGE_LIMIT;

    params.page = page;
    params.limit = limit;
    
    return params;
  }    

  static isPalindrome(str: string, fromLength: number = 3): boolean {

    if(str.length < fromLength)
      return false;

    let result: boolean = true;        

    for (let i: number = 0; i < str.length / 2; i++) {
      let notValid = str[i] !== str[str.length - 1 - i];
      if (notValid) {
        result = false;
      }
    }
    return result;
  }
}
