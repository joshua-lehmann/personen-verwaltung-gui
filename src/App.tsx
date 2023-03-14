import {useState} from 'react'
import './App.css'
import Person from "./components/PersonInterface";
import City from "./components/City";
import Address from "./components/Address";
import {Divider} from "antd";
import PersonList from "./components/PersonList";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <div className={"bottom-space"}>
                <PersonList></PersonList>
            </div>
            <div className={"bottom-space"}>
                <Person>

                </Person>
            </div>
            <Divider></Divider>
            <div className={"bottom-space"}>
                <City></City>
            </div>
            <Divider></Divider>
            <div className={"bottom-space"}>
                <Address></Address>
            </div>
        </div>
    )
}

export default App
