import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Address from './Address';
import {IAddress} from './AddressInterface';
import AddressList from './AddressList';

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Array<IAddress>>([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/addresses')
      .then(({data}) => {
        setAddresses(data._embedded.addresses);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Address />
      {<AddressList addresses={addresses} />}
    </div>
  );
};

export default AddressPage;
