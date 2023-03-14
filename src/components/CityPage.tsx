import React, { useEffect, useState } from "react";
import City from "./City";
import CityList, { CityInterface } from "./CityList";
import axios from "axios";
import { Spin } from "antd";

interface CityPageProps {}

function CityPage(props: CityPageProps) {
  const [cities, setCities] = useState<Array<CityInterface>>();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) {
      axios
        .get("http://localhost:8080/city")
        .then(({ data }) => {
          setCities(
            data._embedded.city.map((city: any) => {
              return {
                zipCode: city.zipCode,
                cityName: city.cityName,
                link: city._links.self.href,
              };
            })
          );
          setReload(false);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [reload]);
  return (
    <>
      <div>
        <City setReload={setReload}></City>
        {cities && cities.length > 0 && reload == false ? (
          <CityList cities={cities} setReload={setReload}></CityList>
        ) : (
          <Spin />
        )}
      </div>
    </>
  );
}

export default CityPage;
