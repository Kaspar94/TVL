export class BusinessClient {
  axapta: string;
  street: string;
  name: string;
  city: string;
  postIndex: string;
  country: string;
  deliveryCountry: string;
  serviceNumber: string;
  constructor(axapta, name, street, city, postIndex, country, deliveryCountry, serviceNumber) {
    this.axapta = axapta;
    this.street = street;
    this.name = name;
    this.city = city;
    this.postIndex = postIndex;
    this.country = country;
    this.deliveryCountry = deliveryCountry;
    this.serviceNumber = serviceNumber;
  }
}
