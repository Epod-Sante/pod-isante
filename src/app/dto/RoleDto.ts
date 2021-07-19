import {Permission} from "./Permission";

export class RoleDto {
  roleId : number;
  name:	string;
  user : string;

  constructor(name: string, roleId : number , user : string) {
    this.user = user;
    this.name = name;
    this.roleId = roleId;
  }


}
