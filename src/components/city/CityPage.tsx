import {Spin} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import City from './City';
import CityList, {CityInterface} from './CityList';

interface CityPageProps {}

function CityPage(props: CityPageProps) {
  const [cities, setCities] = useState<Array<CityInterface>>();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
      axios
        .get('http://localhost:8080/cities')
        .then(({data}) => {
          setCities(
            data._embedded.cities.map((city: any) => {
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
        <City setReload={setReload} />
        {!reload ? <CityList cities={cities} setReload={setReload} /> : <Spin />}
      </div>
    </>
  );
}

export default CityPage;
