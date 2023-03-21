import {Button, notification, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import {Link} from 'react-router-dom';
import {IPerson} from './PersonInterface';

interface PersonListProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  people: Array<IPerson>;
}

function PersonList({people, setLoading}: PersonListProps) {
  const [notificationApi, contextHolder] = notification.useNotification();
  const deletePerson = (person: IPerson) => {
    axios
      .delete(person.link)
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

  const columns: ColumnsType<IPerson> = [
    {
      title: 'Vorname',
      dataIndex: 'firstName',
    },
    {
      title: 'Nachname',
      dataIndex: 'lastName',
    },
    {
      title: 'Heimatort',
      dataIndex: 'homeTown',
    },
    {
      title: 'Geburtstag',
      dataIndex: 'birthDate',
      render: () => dayjs().format('DD.MM.YYYY'),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (text, record) => {
        return (
          <>
            <Link to={`../person/${record.id}`}>Edit</Link>
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
            <Button danger onClick={() => deletePerson(record)}>
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
      <Table columns={columns} dataSource={people} />
    </div>
  );
}

export default PersonList;
