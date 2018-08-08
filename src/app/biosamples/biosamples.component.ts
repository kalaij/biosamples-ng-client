import {Component, OnInit} from '@angular/core';
import {BiosamplesService} from '../services/biosamples.service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import {BadInputError} from '../common/bad-input';

export type BioSamplesAttributeResult = { accession: string, url: string, name: string };

@Component({
  selector: 'app-biosamples',
  templateUrl: './biosamples.component.html',
  styleUrls: ['./biosamples.component.css']
})
export class BiosamplesComponent implements OnInit {

  totalEntries: number;
  lastUpdatedTimeStamp: string;
  totalSearchDone: boolean = false;

  sampleName: string;
  sampleLink: string;
  sampleAcc: string;
  accSearchDone: boolean = false;

  retrievedAccessions: BioSamplesAttributeResult[] = [];
  keyValueSearchDone: boolean = false;
  showTip: boolean = true;
  attrKey : string;
  attrValue : string;
  totalAttributeAccessions : number;
  totalPages : number;
  currentPage: number = 1;


  constructor(private biosamplesService: BiosamplesService) {
  }

  ngOnInit() {
  }

  getTotalSampleCount() {
    this.biosamplesService.getAll().subscribe(response => {
      if (response.length != 0) {
        this.totalEntries = this.extractCount(response);
        this.lastUpdatedTimeStamp = this.extractLastUpdatedTimestamp(response);
        this.totalSearchDone = true;
      }
    });
  }

  private extractCount(response: any): number {
    let count = response['page']['totalElements'];
    return count;
  }

  private extractLastUpdatedTimestamp(response: any): string {
    let timestamp = response['_embedded']['samples'][0]['update'];
    return timestamp;
  }

  onSearch(sampelID: string) {
    this.biosamplesService.getByAccession(sampelID.replace(/ /g, '')).subscribe(response => {
      if (response.length != 0) {
        this.extractName(response);
        this.sampleAcc = sampelID;
        this.accSearchDone = true;
      }
    });
  }

  private extractName(response: any) {
    if (!response.hasOwnProperty('_embedded')) {
      this.doUpdate();
      throw new BadInputError('No results found. Please check your input');
    }
    if (response['_embedded']['samples']) {
      let samples = response['_embedded']['samples'];
      if (samples != null && samples.length > 0) {
        this.sampleName = response['_embedded']['samples'][0]['name'];
        this.sampleLink = response['_embedded']['samples'][0]['_links']['self']['href'];
      }
    }
  }

  onSearchByAttribute(keyValue: string) {
    this.showTip = false;
    let searchTerm = keyValue.trim();
    this.biosamplesService.getByAttribute(searchTerm).subscribe(response => {
      if (response.length != 0) {
        this.extractAccessions(response, keyValue);
        this.keyValueSearchDone = true;
      }
    });
  }

  private extractAccessions(response: any, keyValue: string) {
    if (!response.hasOwnProperty('_embedded')) {
      this.doUpdateAttrSearch();
      throw new BadInputError('No results found. Please check your input');
    }
    this.attrKey = keyValue.split(':')[0];
    this.attrValue = keyValue.split(':')[1];
    this.retrievedAccessions = [];
    let samples: any[] = response['_embedded']['samples'];
    if (samples != null && samples.length > 0) {
      for (let sample of samples) {
        let bioSamplesResult: BioSamplesAttributeResult = <BioSamplesAttributeResult>{};
        bioSamplesResult.name = sample['name'];
        bioSamplesResult.url = sample['_links']['self']['href'];
        bioSamplesResult.accession = sample['accession'];
        this.retrievedAccessions.push(bioSamplesResult);
      }
      this.totalAttributeAccessions =  response['page']['totalElements'];
      this.totalPages = response['page']['totalPages'];
    }
  }

  extendAttributeSearch(){
    let newSearchTerm = this.attrKey+ ":" + this.attrValue + "&page=" + this.currentPage + "&size=" + this.getRemainingCount();
    this.biosamplesService.getByAttribute(newSearchTerm).subscribe(response => {
      if (response.length != 0) {
        this.extractAccessions(response, this.attrKey+ ":" + this.attrValue);
      }
    });
  }

  getRemainingCount() : number{
    let todoCount = this.currentPage == this.totalPages ? 20 - ((this.totalPages * 20) - this.totalAttributeAccessions) : 20;
    return todoCount;
  }


  doUpdate() {
    this.accSearchDone = false;
    this.sampleAcc = "";
    this.sampleLink = "";
    this.sampleName = "";
  }

  doUpdateAttrSearch() {
    this.keyValueSearchDone = false;
    this.retrievedAccessions = [];
    this.showTip = true;
    this.totalAttributeAccessions = 0;
    this.currentPage =1;
  }

  pageChanged(event){
    this.currentPage = event;
    this.extendAttributeSearch();
  }

}
