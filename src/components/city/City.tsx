import {Button, Col, Form, Input, InputNumber, notification, Row} from 'antd';
import {RuleObject} from 'antd/es/form';
import axios from 'axios';
import React from 'react';
import {CityForm} from './CityInterface';

const zipCodeValidator = (rule: RuleObject, value: number) => {
  if (value && value.toString().length !== 4) {
    return Promise.reject('PLZ muss 4 Stellen haben!');
  }
  return Promise.resolve();
};

interface CityProps {
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

function City({setReload}: CityProps) {
  const [form] = Form.useForm<CityForm>();
  const [notificationApi, contextHolder] = notification.useNotification();
  const saveCity = (city: CityForm) => {
    axios
      .post('http://localhost:8080/cities', city)
      .then((response) => {
        setReload(true);
        form.resetFields();
      })
      .catch((error) => {
        notificationApi.error({
          message: 'Error when trying to add new city',
          description: error.response.data.cause.cause.message,
          duration: 8,
        });
      });
  };

  return (
    <>
      <div>
        {contextHolder}
        <Form<CityForm> onFinish={saveCity} form={form}>
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
                  {validator: (rule, value) => zipCodeValidator(rule, value)},
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
                Hinzufügen
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default City;
