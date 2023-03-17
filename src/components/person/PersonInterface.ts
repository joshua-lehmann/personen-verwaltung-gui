import {IAddress} from '../address/AddressInterface';

export interface PersonForm {
  name: string;
  firstName: string;
  birthDate: Date;
  homeTown: string;
}

export interface IPerson {
  id: number;
  name: string;
  firstName: string;
  birthDate: Date;
  homeTown: string;
  personAddresses: Array<IAddress>;
  link: string;
}
