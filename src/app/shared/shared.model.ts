export class Company {
  id: number;
  name: string;
  origin: string;
  constructor(id,name,origin){
    this.id = id;
    this.name = name;
    this.origin = origin;
  }
}

export class Country {
  id: number;
  fullName: string;
  shortName: string;
  constructor(id, fullName, shortName){
    this.id = id;
    this.fullName = fullName;
    this.shortName = shortName;
  }
}

export class BusinessClient {
  id: number;
  axapta: any;
  street: string;
  name: string;
  city: string;
  postIndex: number;
  country: string;
  deliveryCountry: string;
  serviceNumber: any;
  constructor(id, axapta, street, name, city, postIndex, country, deliveryCountry, serviceNumber) {
    this.id = id;
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
