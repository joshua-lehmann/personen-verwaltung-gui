import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {PersonInterface} from '../person/PersonInterface';

interface AddressListProps {}

const columns: ColumnsType<PersonInterface> = [
  {
    title: 'Ort',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Haus Nummer',
    dataIndex: 'houseNumber',
    key: 'houseNumber',
  },
  {
    title: 'Strasse',
    dataIndex: 'street',
    key: 'street',
  },
  {
    title: 'PLZ',
    dataIndex: 'zipCode',
    key: 'zipCode',
  },
];

function AddressList(props: AddressListProps) {
  const [address, setAddress] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:8080/addresses')
      .then(({data}) => {
        setAddress(data._embedded.address);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <Table columns={columns} dataSource={address} />
      </div>
    </>
  );
}

export default AddressList;
