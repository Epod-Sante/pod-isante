import {Permission} from "./Permission";
import { RoleDto} from "./RoleDto";

export class LoginServerDTO{
  access_token: string;
  passwordIsTrue:	boolean;
  permissions	: Permission;
  roles: RoleDto;
  status:	string;
  userNameExist	:boolean;
  username	: string;
}
