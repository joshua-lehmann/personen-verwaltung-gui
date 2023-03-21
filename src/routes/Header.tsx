import {ContactsOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons';
import {Menu, MenuProps} from 'antd';
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import './Header.css';

const items: MenuProps['items'] = [
  {
    key: 'city',
    icon: <HomeOutlined />,
    label: <Link to={'/city'}>City</Link>,
  },
  {
    key: 'address',
    icon: <ContactsOutlined />,
    label: <Link to={'/address'}>Address</Link>,
  },
  {
    key: 'person',
    icon: <UserOutlined />,
    label: <Link to={'/person'}>Person</Link>,
  },
];
export default function Header() {
  return (
    <>
      <div className={'navigation'}>
        <h1>Personen Verwaltung</h1>
        <Menu mode={'horizontal'} items={items} />
      </div>
      <div id={'page'}>
        <Outlet />
      </div>
    </>
  );
}
