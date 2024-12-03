import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home = () => {
  const [message, setMessage] = React.useState("");
  useEffect(() => {
    axios.get('http://localhost:5000/dwf/message')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => { console.log(error) });
  }, []);
  return (
    <>
      <Navbar />
      <p>{message}</p>
      <div className="flex items-center justify-center w-full min-h-[calc(100vh-64px)]"></div>
    </>
  );
};

export default Home;
