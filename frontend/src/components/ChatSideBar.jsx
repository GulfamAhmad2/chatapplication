import { CheckCheck, ListFilter, Search, UserPlus } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import img from "../assets/profile.jpg";

export default function ChatSideBar() {
  return (
    <div className="min-h-screen bg-[var(--input-bg)] w-[300px]">
      <ChatSideBarHeader />
    </div>
  );
}

function ChatSideBarHeader() {
  return (
    <div className="flex flex-col p-4 pb-0 gap-5 h-full">
      <div className="flex items-center justify-between h-full">
        <h3 className=" text-[20px] font-bold text-[var(--primary-text-color)]">
          Chats
        </h3>
        <div className="flex items-center gap-4">
          <Button>
            <UserPlus color="#0088CC" size={24} />
          </Button>
          <Button>
            <ListFilter color="#0088CC" size={24} />
          </Button>
        </div>
      </div>
      <div className="relative">
        <Search
          color="var(--primary-text-color)"
          size={14}
          className="absolute top-[50%] left-2  translate-y-[-50%] rotate-90 "
        />
        <input
          type="search"
          placeholder="Search local friends"
          className="w-full bg-[var(--bg-color)] transi duration-300 border-b-[2px] border-b-[var(--primary-text-color)] focus:border-b-[#0088CC] outline-none  py-1.5 rounded-[6px] pl-8  text-[var(--primary-text-color)]"
        />
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100vh-150px)]">
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
      </div>
    </div>
  );
}

function ChatList() {
  return (
    <div>
      <ChatItem />
    </div>
  );
}

function ChatItem() {
  let seen = true;
  // const isSeen =()=>{
  //   return
  // }
  return (
    <div className="bg-[var(--border-color)] px-4 py-2 flex gap-2 items-center justify-between rounded-[6px] cursor-pointer hover:bg-[var(--border-color)]/70 transition-all duration-100">
      <div className="flex items-center justify-between gap-3">
        <div className="rounded-[50%] overflow-hidden w-[40px] h-[40px]">
          <img src={img} alt="" />
        </div>
        <div className=" flex flex-col gap-1">
          <span className="text-[var(--primary-text-color)] text-[16px] font-semibold">
            name
          </span>
          <div className="flex items-center gap-1">
            {!seen ? (
              <CheckCheck color="#0088CC" size={20} />
            ) : (
              <CheckCheck color="#d1d5dc" size={20} />
            )}
            <span className="text-gray-300 text-[16px] mb-1">mes</span>
          </div>
        </div>
      </div>
      <div className="text-[16px] flex flex-col gap-1.5">
        <span className="text-[var(--primary-text-color)] text-[16px] ">
          23-2-25
        </span>
        <div className="flex gap-2 items-center justify-end">
          <span>📌</span>
          <span>🔕</span>
        </div>
      </div>
    </div>
  );
}


