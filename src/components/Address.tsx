import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import axios from "axios";
import AddressList from "./AddressList";

interface AddressProps {}

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

function Address(props: AddressProps) {
  const [city, setCity] = useState<City>();
  const [loading, setLoading] = useState(true);
  const [cityOptions, setCityOptions] = useState<Array<CityOption>>();
  console.log(cityOptions);

  useEffect(() => {
    axios
      .get("http://localhost:8080/city")
      .then(({ data }) => {
        const cities = data._embedded.city;
        setCityOptions(
          cities.map((city: any) => {
            return {
              value: city.zipCode,
              label: city.zipCode,
              cityName: city.cityName,
              id: city["_links"].self.href,
            };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [form] = Form.useForm();
  const savePerson = (values: any) => {
    console.log(values);
    const data = {
      ...values,
      city: city?.id,
    };
    axios
      .post("http://localhost:8080/address", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onZipCodeChange = (value: any) => {
    console.log(value);
    if (cityOptions) {
      const newCity = cityOptions.find((city) => city.value === value);
      if (newCity) {
        setCity(newCity);
        form.setFieldValue("city", newCity?.cityName);
      } else {
        console.log("City not found");
      }
    }
  };

  return (
    <>
      <div>
        <Form
          onFinish={savePerson}
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Row>
            <Col span={10}>
              <Form.Item name={"street"} label={"Strasse"}>
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item name={"houseNumber"} label={"Nr."}>
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item name={"zipCode"} label={"PLZ"}>
                <Select
                  loading={loading}
                  style={{ width: "100%" }}
                  onChange={onZipCodeChange}
                  options={cityOptions}
                >
                  {" "}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item name={"city"} label={"Ortschaft"}>
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>
          <Button className={"button-margin"} type="primary" htmlType="submit">
            Speichern
          </Button>
        </Form>
      </div>
      <AddressList></AddressList>
    </>
  );
}

export default Address;
