import {Button, notification, Switch, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import {IAddress} from './AddressInterface';

interface AddressListProps {
  addresses: Array<IAddress>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const dateFormatter = (date: string) => {
  return date ? dayjs(date).format('DD.MM.YYYY') : null;
};

function AddressList({addresses, setLoading}: AddressListProps) {
  const [notificationApi, contextHolder] = notification.useNotification();
  console.log('addresses', addresses);
  const deleteAddress = (address: IAddress) => {
    axios
      .delete(address.link)
      .then(() => {
        setLoading(true);
      })
      .catch((error) => {
        notificationApi.error({
          message: 'Error when trying to delete',
          description: error.response.data.cause.cause.message,
          duration: 8,
        });
      });
  };

  const columns: ColumnsType<IAddress> = [
    {
      title: 'Strasse',
      dataIndex: 'street',
    },
    {
      title: 'Hausnummer',
      dataIndex: 'houseNumber',
    },
    {
      title: 'PLZ',
      dataIndex: ['city', 'zipCode'],
    },
    {
      title: 'Ort',
      dataIndex: ['city', 'cityName'],
    },
    {
      title: 'Gültig von',
      dataIndex: 'validFrom',
      render: dateFormatter,
    },
    {
      title: 'Gültig bis',
      dataIndex: 'validTo',
      render: dateFormatter,
    },
    {
      title: 'Aktuelle Adresse',
      dataIndex: 'isCurrentAddress',
      render: (text, record) => {
        return (
          <>
            <Switch disabled={true} checked={record.isCurrentAddress} />
          </>
        );
      },
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text, record) => {
        return (
          <>
            <Button danger onClick={() => deleteAddress(record)}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={addresses} />
    </>
  );
}

export default AddressList;
