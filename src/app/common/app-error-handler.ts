import {ErrorHandler} from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  //global exception message
  handleError(error) {
    alert('An unexpected error occurred. Please Try again!');
   // console.log(error);
  }

}
