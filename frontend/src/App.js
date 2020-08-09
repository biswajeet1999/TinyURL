import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import Modal from "./Modal";

const App = () => {
  const [data, setData] = useState({
    url: "",
    shortUrl: "",
    err: "",
    success: false,
    loading: false,
  });

  return (
    <div className="wrapper">
      <h1 className="heading">ShortMyUrl</h1>
      <Form data={data} setData={setData} />
      <Modal data={data} setData={setData} />
    </div>
  );
};

export default App;
