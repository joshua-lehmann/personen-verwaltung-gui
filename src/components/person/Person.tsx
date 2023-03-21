import {Button, Col, DatePicker, Form, Input, Row} from 'antd';
import axios from 'axios';
import React from 'react';
import {IPerson} from './PersonInterface';

const dateFormat = 'DD.MM.YYYY';

interface PersonProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Person({setLoading}: PersonProps) {
  const savePerson = (values: IPerson) => {
    axios
      .post('http://localhost:8080/people', values)
      .then((response) => {
        console.log(response);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form
      onFinish={savePerson}
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      validateMessages={{required: 'Bitte ${label} eingeben!'}}
    >
      <Row>
        <Col span={10}>
          <Form.Item name={'lastName'} label={'Name'} rules={[{required: true}]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={10} offset={2}>
          <Form.Item name={'firstName'} label={'Vorname'} rules={[{required: true}]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Form.Item name={'birthDate'} label={'Geburtsdatum'} rules={[{required: true}]}>
            <DatePicker style={{width: '100%'}} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col span={10} offset={2}>
          <Form.Item name={'homeTown'} label={'Heimatort'} rules={[{required: true}]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Button type={'primary'} htmlType={'submit'}>
        Hinzufügen
      </Button>
    </Form>
  );
}

export default Person;
