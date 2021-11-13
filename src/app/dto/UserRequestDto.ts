import {AccountDto} from "./AccountDto";
import {AddressDto} from "./AddressDto";
import {EmailDto} from './EmailDto';
import {InstitutionDto} from './InstitutionDto';
import {RoleDto} from './RoleDto';


export class UserRequestDto{
  id : string;
  account: AccountDto;
  address	: AddressDto;
  birthday	: string;
  email :	EmailDto;
  firstName: String
  lastName: String;
  middleName : String;
  institution:	InstitutionDto;
  role : RoleDto;


  constructor(id : string,
              accountDto: AccountDto,
              birthday: string,
              emailDto: EmailDto,
              firstName: String,
              middleName: String,
              lastName: String,
              institutionDto: InstitutionDto,
              roleDto: RoleDto,
              addressDto :AddressDto
  ) {
    this.id = id;
    this.account = accountDto;
    this.birthday = birthday;
    this.email = emailDto;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.institution = institutionDto;
    this.role = roleDto;
    this.address = addressDto;
  }



}
