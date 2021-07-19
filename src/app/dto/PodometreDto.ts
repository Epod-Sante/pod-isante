export  class PodometreDto {
  id : string;
  code : string;
  model : string;
  authorized : boolean;


  constructor(id: string, code: string, model: string, autorizzed : boolean) {
    this.id = id;
    this.code = code;
    this.model = model;
    this.authorized = autorizzed
  }
}
