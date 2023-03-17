import {Spin} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AddressList from '../address/AddressList';
import Person from './Person';
import './person.css';
import {IPerson} from './PersonInterface';
import PersonList from './PersonList';

const PersonPage = () => {
  const [people, setPeople] = useState<Array<IPerson>>([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    if (loading) {
      axios
        .get('http://localhost:8080/people')
        .then(({data}) => {
          setPeople(data._embedded.people.map((person: any) => ({...person, link: person._links.self.href})));
          setLoading(false);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [loading]);

  return (
    <div>
      <div className={'personForm'}>
        <Person setLoading={setLoading} />
      </div>
      {loading ? (
        <Spin />
      ) : id !== undefined && id !== null ? (
        <>
          <h2>Addresses</h2>
          <AddressList addresses={people[0].personAddresses} setLoading={setLoading} />
        </>
      ) : (
        <PersonList people={people} setLoading={setLoading} />
      )}
    </div>
  );
};

export default PersonPage;
