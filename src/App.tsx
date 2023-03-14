import { useState } from "react";
import "./App.css";
import Person from "./components/PersonInterface";
import City from "./components/City";
import Address from "./components/Address";
import { Divider } from "antd";
import PersonList from "./components/PersonList";
import Header from "./routes/Header";
import { Route, Routes } from "react-router-dom";
import CityList from "./components/CityList";
import AddressList from "./components/AddressList";
import CityPage from "./components/CityPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="city" element={<CityPage />} />
          <Route path="address" element={<Address />} />
          <Route path="address-list" element={<AddressList />} />
          <Route path="person" element={<Person />} />
          <Route path="person-list" element={<PersonList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
