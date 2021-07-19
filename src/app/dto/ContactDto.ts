export class ContactDto {
  phone: number;
  email: string;
  //private AddressDto address


  constructor(phone: number, email: string) {
    this.phone = phone;
    this.email = email;
  }
}
