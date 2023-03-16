import {ConfigProvider} from 'antd';
import locale from 'antd/locale/de_DE';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import AddressPage from './components/address/AddressPage';
import CityPage from './components/city/CityPage';
import Person from './components/person/PersonInterface';
import PersonList from './components/person/PersonList';
import Header from './routes/Header';

dayjs.locale('de-ch');

function App() {
  return (
    <div className={'App'}>
      <ConfigProvider locale={locale}>
        <Routes>
          <Route path={'/'} element={<Header />}>
            <Route path={'city'} element={<CityPage />} />
            <Route path={'address'} element={<AddressPage />} />
            <Route path={'address-list'} element={<AddressPage />} />
            <Route path={'person'} element={<Person />} />
            <Route path={'person-list'} element={<PersonList />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
