import {Dayjs} from 'dayjs';

export interface IAddress {
  street: string;
  houseNumber: number;
  validFrom: Dayjs;
  validTo: Dayjs;
  isCurrentAddress: boolean;
  link: string;
}

export interface IAddressForm {
  street: string;
  houseNumber: number;
  zipCode: number;
  city: string;
}
