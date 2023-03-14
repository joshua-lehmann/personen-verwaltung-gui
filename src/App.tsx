import { useState } from "react";
import "./App.css";
import Person from "./components/PersonInterface";
import City from "./components/City";
import Address from "./components/Address";
import { Divider } from "antd";
import PersonList from "./components/PersonList";
import Header from "./routes/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;
