import React from "react";
import {io} from "socket.io-client";


import SideBar from "../components/SideBar";
import ChatSideBar from "../components/ChatSideBar";

const socket = io("http://localhost:5000", {
  withCredentials: true,
})
const Home = () => {
  return (
    <main className="flex  bg-[var(--bg-color)] min-h-screen">
      <div>
        <SideBar />
      </div>
      <div className="flex ">
        <aside>
          <ChatSideBar/>
        </aside>
        <section>
          <header></header>
          <div></div>
        </section>
      </div>
    </main>
  );
};

export default Home;
