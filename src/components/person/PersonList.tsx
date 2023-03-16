import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import axios from 'axios';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {PersonInterface} from './PersonInterface';

interface PersonListProps {}

const columns: ColumnsType<PersonInterface> = [
  {
    title: 'Vorname',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Nachname',
    dataIndex: 'lastName',
    key: 'firstName',
  },
  {
    title: 'Heimatort',
    dataIndex: 'homeTown',
    key: 'homeTown',
  },
  {
    title: 'Geburtstag',
    dataIndex: 'birthDate',
    key: 'birthDate',
    render: () => dayjs().format('DD.MM.YYYY'),
  },
];

function PersonList(props: PersonListProps) {
  const [people, setPeople] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:8080/people')
      .then(({data}) => {
        setPeople(data._embedded.people);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <Table columns={columns} dataSource={people} />
      </div>
    </>
  );
}

export default PersonList;
