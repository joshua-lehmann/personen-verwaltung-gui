import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import AddressList from './components/address/AddressList';
import AddressPage from './components/address/AddressPage';
import CityPage from './components/city/CityPage';
import Person from './components/person/PersonInterface';
import PersonList from './components/person/PersonList';
import Header from './routes/Header';

function App() {
  return (
    <div className={'App'}>
      <Routes>
        <Route path={'/'} element={<Header />}>
          <Route path={'city'} element={<CityPage />} />
          <Route path={'address'} element={<AddressPage />} />
          <Route path={'address-list'} element={<AddressList />} />
          <Route path={'person'} element={<Person />} />
          <Route path={'person-list'} element={<PersonList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
