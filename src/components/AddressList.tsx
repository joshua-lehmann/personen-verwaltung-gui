import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Person, { PersonInterface } from "./PersonInterface";

interface AddressListProps {}

const columns: ColumnsType<PersonInterface> = [
  {
    title: "Ort",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Haus Nummer",
    dataIndex: "houseNumber",
    key: "houseNumber",
  },
  {
    title: "Strasse",
    dataIndex: "street",
    key: "street",
  },
  {
    title: "PLZ",
    dataIndex: "zipCode",
    key: "zipCode",
  },
];

function AddressList(props: AddressListProps) {
  const [address, setAddress] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/address")
      .then(({ data }) => {
        setAddress(data._embedded.address);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <Table columns={columns} dataSource={address} />
      </div>
    </>
  );
}

export default AddressList;
