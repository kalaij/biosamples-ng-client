import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {BiosamplesComponent} from './biosamples/biosamples.component';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BiosamplesService} from './services/biosamples.service';
import {AppErrorHandler} from './common/app-error-handler';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    BiosamplesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [BiosamplesService, {provide: ErrorHandler , useClass: AppErrorHandler}],
  bootstrap: [BiosamplesComponent]
})
export class AppModule { }
