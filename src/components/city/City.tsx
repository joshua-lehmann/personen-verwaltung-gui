import {Button, Col, Form, Input, InputNumber, Row} from 'antd';
import axios from 'axios';
import React from 'react';

interface CityProps {
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

function City({setReload}: CityProps) {
  const [form] = Form.useForm();
  const saveCity = (values: any) => {
    axios
      .post('http://localhost:8080/cities', values)
      .then((response) => {
        setReload(true);
        form.resetFields();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div>
        <Form onFinish={saveCity} form={form}>
          <Row>
            <Col span={8}>
              <Form.Item
                name={'zipCode'}
                label={'PLZ'}
                rules={[
                  {
                    required: true,
                    message: 'Bitte PLZ eingeben!',
                  },
                  {
                    type: 'number',
                    message: 'Die Eingabe ist keine gültige Zahl!',
                  },
                  {
                    type: 'number',
                    pattern: new RegExp('^[0-9]{4}$'),
                    message: 'PLZ muss 4 Stellen haben!',
                  },
                ]}
              >
                <InputNumber style={{width: '100%'}} controls={false} />
              </Form.Item>
            </Col>
            <Col span={8} offset={2}>
              <Form.Item
                name={'cityName'}
                label={'Ortschaft'}
                rules={[
                  {
                    required: true,
                    message: 'Bitte Ortschaft eingeben!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} offset={2}>
              <Button type={'primary'} htmlType={'submit'}>
                Speichern
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default City;
