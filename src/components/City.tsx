import React from "react";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import axios from "axios";

interface CityProps {
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

function City({ setReload }: CityProps) {
  const saveCity = (values: any) => {
    axios
      .post("http://localhost:8080/city", values)
      .then((response) => {
        console.log(response);
        setReload(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div>
        <Form onFinish={saveCity}>
          <Row>
            <Col span={8}>
              <Form.Item name={"zipCode"} label={"PLZ"}>
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={8} offset={2}>
              <Form.Item name={"cityName"} label={"Ortschaft"}>
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={2} offset={2}>
              <Button type="primary" htmlType="submit">
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
