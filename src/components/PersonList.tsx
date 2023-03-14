import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Person, { PersonInterface } from "./PersonInterface";
import dayjs from "dayjs";

interface PersonListProps {}

const columns: ColumnsType<PersonInterface> = [
  {
    title: "Vorname",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Nachname",
    dataIndex: "lastName",
    key: "firstName",
  },
  {
    title: "Heimatort",
    dataIndex: "homeTown",
    key: "homeTown",
  },
  {
    title: "Geburtstag",
    dataIndex: "birthDate",
    key: "birthDate",
    render: (date) => dayjs().format("DD.MM.YYYY")
  },
];

function PersonList(props: PersonListProps) {
  const [people, setPeople] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/people")
      .then(({ data }) => {
        setPeople(data._embedded.people);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <Table columns={columns} dataSource={people} />
      </div>
    </>
  );
}

export default PersonList;
