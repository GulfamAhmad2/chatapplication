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
import { Link } from "react-router-dom";
import profile from "../assets/profile.jpg";
import { useToggle } from "../hooks/useToggle";

const Home = () => {
  return (
    <main className=" bg-[var(--bg-color)] min-h-screen">
      {/* <MessageSquareMore />
<Phone />
<ListFilter />
<Navigation2 />
<Paperclip />
<SendHorizontal />
<Smile />
<Tally4 />
<Video/>
<Camera />
<CameraOffIcon />
<Mic />
<AudioLines />
<Image />
<Eye />
<EyeOff />
<VideoOff />
<Pin />
<PinOff />
<File />
<Search />  */}
      <div>
        <SideBar />
      </div>
      <div>
        <aside></aside>
        <section>
          <header></header>
        </section>
      </div>
    </main>
  );
};

function SideBar() {
  const [isOpen, toggle] = useToggle();
  console.log(isOpen)
  return (
    <div
      className={` ${
        !isOpen ? "w-[60px]" : "w-[200px]"
      } bg-[var(--border-color)]  min-h-screen flex flex-col justify-between transition-all duration-300`}
    >
      <div className="border-b-1 border-[var(--secondary-text-color)]/50">
        <button className="p-3 cursor-pointer " onClick={() => toggle()}>
          <Menu color="#0088CC" />
        </button>
        <div className="">
          <IconCard title="Chat" isOpen={isOpen}>
            <MessageSquareMore color="#0088CC" size={20} />
          </IconCard>
          <IconCard title="Calls" isOpen={isOpen}>
            <Phone color="#0088CC" size={20} />
          </IconCard>
        </div>
      </div>
      <div className="border-t-1 border-[var(--secondary-text-color)]/50">
        <IconCard title="Settings" isOpen={isOpen}>
          <Settings color="#0088CC" size={20} />
        </IconCard>
        <div></div>
        <IconCard title="Profile" isOpen={isOpen}>
          <div className="rounded-[50%] w-[24px] h-[24px] overflow-hidden">
            <img src={profile} alt="profile-img" />
          </div>
        </IconCard>
      </div>
    </div>
  );
}

function IconCard({ children, title, isOpen }) {
  return (
    <Link className="flex items-center gap-4 p-4 hover:bg-[var(--bg-color)]/50 cursor-pointer ">
      {children}
      {isOpen && (
        <span className="text-[14px] font-medium text-[var(--primary-text-color)]  ">
          {title}
        </span>
      )}
    </Link>
  );
}

export default Home;
