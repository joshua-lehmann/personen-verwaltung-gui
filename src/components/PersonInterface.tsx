import React from 'react';
import {Button, Col, DatePicker, Form, Input, Row} from "antd";
import axios from "axios";

interface PersonProps {

}

export interface PersonInterface {
    name: string;
    firstName: string;
    birthDate: Date;
    homeTown: string;
}

function Person(props: PersonProps) {

    const savePerson = (values: PersonInterface) => {
        console.log(values);
        axios.post("http://localhost:8080/people", values).then(
            (response) => {
                console.log(response);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    return (<>
            <div>
                <Form onFinish={savePerson}
                      labelCol={{span: 8}}
                      wrapperCol={{span: 16}}>
                    <Row>
                        <Col span={10}>
                            <Form.Item name={"lastName"} label={"Name"}>
                                <Input></Input>
                            </Form.Item></Col>
                        <Col span={10} offset={2}>
                            <Form.Item name={"firstName"} label={"Vorname"}>
                                <Input></Input>
                            </Form.Item></Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Form.Item name={"birthDate"} label={"Geburtstdatum"}>
                                <DatePicker style={{width: "100%"}}></DatePicker>
                            </Form.Item></Col>
                        <Col span={10} offset={2}>
                            <Form.Item name={"homeTown"} label={"Heimatort"}>
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

export default Person;