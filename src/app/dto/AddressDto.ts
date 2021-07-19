export class AddressDto {


  city :	string;
  postalCode:	string;
  province	:	string;
  street	:	string;
  streetNumber	: number;


  constructor(city: string, postalCode: string, province: string, street: string, streetNumber: number) {
    this.city = city;
    this.postalCode = postalCode;
    this.province = province;
    this.street = street;
    this.streetNumber = streetNumber;
  }
}
