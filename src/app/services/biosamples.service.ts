import {Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {Http} from "@angular/http";

@Injectable()
export class BiosamplesService extends DataService {

  constructor(http: Http) {
    super("https://www.ebi.ac.uk/biosamples/samples", http);
  }

  getByAccession(accession: string) {
    let query = this.getUrl()+ "?filter=acc:" + accession
    return this.getHttp().get(query)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getByAttribute(attributePair : string){
    let query = this.getUrl()+ "?filter=attr:" + attributePair
    return this.getHttp().get(query)
      .map(response => response.json())
      .catch(this.handleError);
  }


}
