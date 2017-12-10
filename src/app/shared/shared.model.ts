export class BusinessClient {
  id: number;
  axapta: string;
  street: string;
  name: string;
  city: string;
  postIndex: string;
  country: string;
  deliveryCountry: string;
  serviceNumber: string;
  constructor(id, axapta, name, street, city, postIndex, country, deliveryCountry, serviceNumber) {
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

export class Language {
  countryLetters: string;
  jsonLetters: string;
  constructor(countryLetters, jsonLetters) {
    this.countryLetters = countryLetters;
    this.jsonLetters = jsonLetters;
  }
}

export class FormInfo {
  name: any;
  mobile: any;
  email: any;
  constructor(name, email, mobile) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
  }
}
