
export class ProfessionalDto {
     id : string;
     firstName : string;
  lastName : string;
  root : boolean;


  constructor(id: string, firstName: string, lastName: string, root: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.root = root;
  }
}
