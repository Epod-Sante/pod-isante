import {AddressDto} from "./AddressDto";

export class ContactDto {

  id: string;
  phone: string;
  email: string;
  address: AddressDto


  constructor(id: string, phone: string, email: string, address: AddressDto) {
    this.id = id;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
}
