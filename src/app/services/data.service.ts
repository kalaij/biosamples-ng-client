import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppError} from '../common/app-error';
import {NotFoundError} from '../common/not-found-error';
import {BadInputError} from '../common/bad-input';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/throw';


@Injectable()
export class DataService {

  constructor(private url: string, private http: Http) {
  }

  getUrl() {
    return this.url;
  }

  getHttp() {
    return this.http;
  }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  public handleError(error: Response) {
    if (error.status == 400)
      return Observable.throw(new BadInputError(error.json()));

    if (error.status == 404)
      return Observable.throw(new NotFoundError('Page not found'));

    return Observable.throw(new AppError('Something wrong with the application'));
  }


}
