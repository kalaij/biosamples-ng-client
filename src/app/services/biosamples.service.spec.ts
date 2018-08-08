import { TestBed, inject } from '@angular/core/testing';

import { BiosamplesService } from './biosamples.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { HttpClient } from '@angular/common/http';
import {HttpModule} from "@angular/http";
import {BadInputError} from "../common/bad-input";

describe('BiosamplesService', () => {

  let service: BiosamplesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpModule],
      providers: [BiosamplesService, HttpClient]
    });

    service = TestBed.get(BiosamplesService);
    httpMock = TestBed.get(HttpTestingController);

  });


  it('should be create the Biosamples service', inject([BiosamplesService], (service: BiosamplesService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the name successfully from the accession', () => {
    service.getByAccession("SAMN04965834").subscribe((data: any) => {
      expect(data['_embedded']['samples'][0]['name']).toBe('GSM2147569');
    });
  });

  it('should throw error for invalid sample ID', () => {
    service.getByAccession("SAMN04965").subscribe((data: any) => {
      expect(data['_embedded']['samples'][0]['name']).toThrow(new BadInputError());
    });
  });

  it('should get the correct total records range', () => {
    service.getAll().subscribe((data: any) => {
      expect(data['page']['totalElements']).toBeGreaterThan(5000000);
    });
  });

  it('should retrieve the accessions for attr search', () => {
    service.getByAttribute("Organism:Homo Sapiens").subscribe((data: any) => {
      expect(data['page']['totalElements']).toBeLessThan(3000);
    });
  });

  it('should throw error for invalid attribute search', () => {
    service.getByAttribute("Organism:Hos").subscribe((data: any) => {
      expect(data['page']['totalElements']).toThrow(new BadInputError());
    });
  });



});
