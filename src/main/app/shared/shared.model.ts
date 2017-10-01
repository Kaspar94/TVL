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
