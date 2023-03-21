import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {Button, Col, DatePicker, Form, Input, Row, Select, Switch} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import './address.css';
import {IAddressForm} from './AddressInterface';
import {IPerson} from '../person/PersonInterface';

interface City {
  id: string;
  value: number;
  cityName: string;
}

interface CityOption {
  id: string;
  value: number;
  label: number;
  cityName: string;
}

interface PersonOption {
  value: number;
  label: string;
  link: string;
}

const dateFormat = 'DD.MM.YYYY';

interface AddressProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Address({setLoading}: AddressProps) {
  const [city, setCity] = useState<City>();
  const [cityOptions, setCityOptions] = useState<Array<CityOption>>();
  const [peopleOptions, setPeopleOptions] = useState<Array<PersonOption>>();
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get('http://localhost:8080/cities')
      .then(({data}) => {
        const cities = data._embedded.cities;
        setCityOptions(
          cities.map((city: any) => {
            return {
              value: city.zipCode,
              label: city.zipCode + ' ' + city.cityName,
              cityName: city.cityName,
              id: city['_links'].self.href,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('http://localhost:8080/people').then(({data}) => {
      const people: Array<IPerson> = data._embedded.people;
      setPeopleOptions(
        people.map((person: any) => {
          return {
            value: person['_links'].self.href,
            label: person.firstName + ' ' + person.lastName,
            link: person['_links'].self.href,
          };
        })
      );
    });
  }, []);

  const saveAddress = (values: any) => {
    console.log(values);
    const data = {
      ...values,
      city: city?.id,
    };
    axios
      .post('http://localhost:8080/addresses', data)
      .then(() => {
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onZipCodeChange = (value: any) => {
    if (cityOptions) {
      const newCity = cityOptions.find((city) => city.value === value);
      if (newCity) {
        setCity(newCity);
        form.setFieldValue('city', newCity?.cityName);
      } else {
        console.log('city not found');
      }
    }
  };

  return (
    <>
      <div className={'addressForm'}>
        <Form<IAddressForm>
          onFinish={saveAddress}
          form={form}
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          validateMessages={{required: 'Bitte ${label} eingeben!'}}
          initialValues={{validFrom: dayjs().startOf('day')}}
        >
          <Row>
            <Col span={10}>
              <Form.Item name={'street'} label={'Strasse'} rules={[{required: true}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item name={'houseNumber'} label={'Nr.'} rules={[{required: true}]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item name={'zipCode'} label={'PLZ'} rules={[{required: true}]}>
                <Select style={{width: '100%'}} onChange={onZipCodeChange} options={cityOptions} showSearch={true} />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item name={'city'} label={'Ortschaft'} rules={[{required: true}]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item name={'validFrom'} label={'Gültig von'} rules={[{required: true}]}>
                <DatePicker format={dateFormat} />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item name={'validTo'} label={'Gültig bis'} rules={[{required: true}]}>
                <DatePicker format={dateFormat} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item
                name={'isCurrentAddress'}
                label={'Aktuelle Adresse'}
                valuePropName={'checked'}
                className={'switch'}
              >
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item name={'person'} label={'Person'} rules={[{required: true}]}>
                <Select style={{width: '100%'}} options={peopleOptions} showSearch={true} />
              </Form.Item>
            </Col>
          </Row>
          <Button className={'button-margin'} type={'primary'} htmlType={'submit'}>
            Hinzufügen
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Address;
