


export class AddressDto {

    street : string;
    streetNumber : string;
    city : string;
    postalCode : string;
    province : string;


  constructor(street: string, streetNumber: string, city: string, postalCode: string, province: string) {
    this.street = street;
    this.streetNumber = streetNumber;
    this.city = city;
    this.postalCode = postalCode;
    this.province = province;
  }
}
