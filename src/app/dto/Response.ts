export class Response {
    object: Object;
    error: Error;


  constructor(object: Object, error: Error) {
    this.object = object;
    this.error = error;
  }
}
