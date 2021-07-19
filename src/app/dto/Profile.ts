export class Profile {
 name : string;
 role : string;
 acces : string[];
 validity : boolean;

  constructor(name: string, role: string, validity: boolean) {
    this.name = name;
    this.role = role;
    this.validity = validity;
  }
}
