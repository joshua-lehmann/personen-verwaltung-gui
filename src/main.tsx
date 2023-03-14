import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Header from "./routes/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import City from "./components/City";
import Person from "./components/PersonInterface";
import Address from "./components/Address";
import PersonList from "./components/PersonList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
  {
    path: "/city",
    element: <City />,
  },
  {
    path: "/person",
    element: <Person />,
  },
  {
    path: "/person-list",
    element: <PersonList />,
  },
  {
    path: "/address",
    element: <Address />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);
