export class AppError{
	constructor(public originalError ?: any){
        alert(originalError);
	}
}
