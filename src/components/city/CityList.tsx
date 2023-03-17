import {Button, notification, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import axios from 'axios';
import React from 'react';

interface CityListProps {
  cities?: Array<CityInterface>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CityInterface {
  zipCode: number;
  cityName: string;
  link: string;
}

function CityList({cities, setReload}: CityListProps) {
  const [notificationApi, contextHolder] = notification.useNotification();

  const deleteCity = (city: CityInterface) => {
    axios
      .delete(city.link)
      .then(() => {
        setReload(true);
      })
      .catch((error) => {
        notificationApi.error({
          message: 'Error when trying to delete',
          description: error.response.data.cause.cause.message,
          duration: 8,
        });
      });
  };

  const columns: ColumnsType<CityInterface> = [
    {
      title: 'PLZ',
      dataIndex: 'zipCode',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.zipCode - b.zipCode,
    },
    {
      title: 'Stadt',
      dataIndex: 'cityName',
      sorter: (a, b) => a.cityName.localeCompare(b.cityName),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text, record) => {
        return (
          <>
            <Button danger onClick={() => deleteCity(record)}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <Table columns={columns} dataSource={cities} />
    </div>
  );
}

export default CityList;
