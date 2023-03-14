import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";


interface CityListProps {}
export interface CityInterface {
  zipCode: number;
  cityName: string;
}

const columns: ColumnsType<CityInterface> = [
  {
    title: "PLZ",
    dataIndex: "zipCode",
    key: "zipCode",
  },
  {
    title: "Stadt",
    dataIndex: "cityName",
    key: "cityName",
  },
];

function CityList(props: CityListProps) {
  const [cities, setCities] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/city")
      .then(({ data }) => {
        setCities(data._embedded.city);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <Table columns={columns} dataSource={cities} />
      </div>
    </>
  );
}

export default CityList;
