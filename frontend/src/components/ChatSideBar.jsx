import { ListFilter, Search, UserPlus } from "lucide-react";
import Button from "./Button";
import Input from "./Input";

export default function ChatSideBar() {
  return (
    <div className="min-h-screen bg-[var(--input-bg)] w-[300px]">
      <ChatSideBarHeader />
    </div>
  );
}

function ChatSideBarHeader() {
  return (
    <div className="flex flex-col p-4 gap-5">
      <div className="flex items-center justify-between">
        <h3 className=" text-[20px] font-bold text-[var(--primary-text-color)]">Chats</h3>
        <div className="flex items-center gap-4">
          <Button>
            <UserPlus color="#0088CC" size={24} />
          </Button>
          <Button>
            <ListFilter color="#0088CC" size={24} />
          </Button>
        </div>
      </div>
      <div className="relative" >
        <Search color="var(--primary-text-color)" size={14} className="absolute top-[50%] left-2  translate-y-[-50%] rotate-90 "/>
      <input type="search" placeholder="Search" className="w-full border border-[var(--border-color)] py-1 rounded-[6px] pl-8 border-b-[var(--accent-hover)] text-[var(--primary-text-color)]" />

      </div>
    </div>
  );
}

function ChatList() {
  return (
    <div>
      
    </div>
  );
}

function ChatItem() {
  return <div></div>;
}
