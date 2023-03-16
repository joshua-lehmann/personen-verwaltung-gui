import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {Button, Col, DatePicker, Form, Input, Row, Select, Switch} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './address.css';
import {IAddressForm} from './AddressInterface';

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

const dateFormat = 'DD.MM.YYYY';

interface AddressProps {}

function Address(props: AddressProps) {
  const [city, setCity] = useState<City>();
  const [loading, setLoading] = useState(true);
  const [cityOptions, setCityOptions] = useState<Array<CityOption>>();
  const [form] = Form.useForm();
  console.log(cityOptions);

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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
      .then((response) => {
        console.log(response);
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
        <Form<IAddressForm> onFinish={saveAddress} form={form} labelCol={{span: 8}} wrapperCol={{span: 16}}>
          <Row>
            <Col span={10}>
              <Form.Item name={'street'} label={'Strasse'}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item name={'houseNumber'} label={'Nr.'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item name={'zipCode'} label={'PLZ'}>
                <Select loading={loading} style={{width: '100%'}} onChange={onZipCodeChange} options={cityOptions} />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item name={'city'} label={'Ortschaft'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item name={'validFrom'} label={'Gültig von'}>
                <DatePicker format={dateFormat} />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item name={'validTo'} label={'Gütlig bis'}>
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
          </Row>
          <Button className={'button-margin'} type={'primary'} htmlType={'submit'}>
            Speichern
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Address;
