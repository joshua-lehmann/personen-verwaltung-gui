import {Switch, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import {IAddress} from './AddressInterface';

interface AddressListProps {
  addresses: Array<IAddress>;
}

const dateFormatter = (date: string) => {
  return date ? dayjs(date).format('DD.MM.YYYY') : null;
};

const columns: ColumnsType<IAddress> = [
  {
    title: 'Strasse',
    dataIndex: 'street',
    key: 'street',
  },
  {
    title: 'Hausnummer',
    dataIndex: 'houseNumber',
    key: 'houseNumber',
  },
  {
    title: 'PLZ',
    dataIndex: ['city', 'zipCode'],
    key: 'zipCode',
  },
  {
    title: 'Ort',
    dataIndex: ['city', 'cityName'],
    key: 'city',
  },
  {
    title: 'Gütlig von',
    dataIndex: 'validFrom',
    key: 'validFrom',
    render: dateFormatter,
  },
  {
    title: 'Gütlig bis',
    dataIndex: 'validTo',
    key: 'validTo',
    render: dateFormatter,
  },
  {
    title: 'Aktuelle Adresse',
    dataIndex: 'isCurrentAddress',
    key: 'isCurrentAddress',
    render: (text, record) => {
      return (
        <>
          <Switch disabled={true} checked={record.isCurrentAddress} />
        </>
      );
    },
  },
];

function AddressList({addresses}: AddressListProps) {
  return (
    <>
      <div>
        <Table columns={columns} dataSource={addresses} />
      </div>
    </>
  );
}

export default AddressList;
