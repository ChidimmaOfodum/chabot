// a class representing a potential lead
class Lead {
  constructor(name, cellphone, country) {
    this.name = name;
    this.cellphone = cellphone;
    this.country = country;
  }
  static allLeads = [];
}

export { Lead };
