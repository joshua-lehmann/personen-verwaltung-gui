import React from 'react';
import {Button, Col, DatePicker, Form, Input, Row} from "antd";
import axios from "axios";

interface CityProps {

}

function City(props: CityProps) {
    const saveCity = (values: any) => {
        console.log(values);
        axios.post("http://localhost:8080/city", values).then(
            (response) => {
                console.log(response);
            }
        ).catch(
            (error) => {
                alert(error);
            }
        )
    }

    return (<>
            <div>
                <Form
                    onFinish={saveCity}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}>
                    <Row>
                        <Col span={10} offset={2}>
                            <Form.Item name={"zipCode"} label={"PLZ"}>
                                <Input></Input>
                            </Form.Item></Col>
                        <Col span={10}>
                            <Form.Item name={"cityName"} label={"Ortschaft"}>
                                <Input></Input>
                            </Form.Item></Col>
                    </Row>
                    <Button type="primary" htmlType="submit">
                        Speichern
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default City;