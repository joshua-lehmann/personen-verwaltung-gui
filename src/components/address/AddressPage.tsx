import {Spin} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Address from './Address';
import {IAddress} from './AddressInterface';
import AddressList from './AddressList';

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Array<IAddress>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      axios
        .get('http://localhost:8080/addresses')
        .then(({data}) => {
          const addressData: Array<IAddress> = data._embedded.addresses.map((address: any) => {
            return {
              ...address,
              link: address._links.self.href,
            };
          });
          setAddresses(addressData);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [loading]);

  return (
    <div>
      <Address setLoading={setLoading} />
      {loading ? <Spin /> : <AddressList addresses={addresses} setLoading={setLoading} />}
    </div>
  );
};

export default AddressPage;
