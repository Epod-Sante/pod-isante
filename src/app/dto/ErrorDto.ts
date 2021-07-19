
export  class ErrorDto {
     errorId : number;
     errorDescription : string;


  constructor(errorId: number, errorDescription: string) {
    this.errorId = errorId;
    this.errorDescription = errorDescription;
  }
}
