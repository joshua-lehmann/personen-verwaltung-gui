import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface CityListProps {
  cities: Array<CityInterface>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface CityInterface {
  zipCode: number;
  cityName: string;
  link: string;
}

function CityList({ cities, setReload }: CityListProps) {
  const deleteCity = (city: CityInterface) => {
    axios
      .delete(city.link, { headers: { "Access-Control-Allow-Origin": "*" } })
      .then((response) => {
        console.log(response);
      })
      .finally(() => {
        setReload(true);
      });
    console.log(city);
  };

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
    {
      title: "Delete",
      key: "cityName",
      render: (text, record) => {
        console.log("record", record);
        return (
          <Button danger onClick={() => deleteCity(record)}>
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Table columns={columns} dataSource={cities} />
      </div>
    </>
  );
}

export default CityList;
