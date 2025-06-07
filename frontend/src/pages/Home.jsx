import React from "react";
import { io } from "socket.io-client";

import SideBar from "../components/SideBar";
import ChatSideBar from "../components/ChatSideBar";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});
const Home = () => {
  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  const res = debounce(() => console.log("callback"), 1000);
  res("name");
  res("name");
  return (
    <div className="flex ">
      <aside className="">
        <ChatSideBar />
      </aside>
      <section>
        <header></header>
        <div></div>
      </section>
    </div>
  );
};

export default Home;
