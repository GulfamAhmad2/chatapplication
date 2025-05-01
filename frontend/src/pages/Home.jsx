import React from "react";
import {
  Settings,
  MessageSquareMore,
  Phone,
  ListFilter,
  Navigation2,
  Paperclip,
  SendHorizontal,
  Smile,
  Tally4,
  Camera,
  CameraOffIcon,
  Mic,
  AudioLines,
  Eye,
  EyeOff,
  VideoOff,
  Pin,
  PinOff,
  Search,
  Video,
  Menu,
} from "lucide-react";

import { useToggle } from "../hooks/useToggle";
import SideBar from "../components/SideBar";
import ChatSideBar from "../components/ChatSideBar";

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
