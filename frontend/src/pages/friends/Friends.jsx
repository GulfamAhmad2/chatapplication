import { CheckCheck, ListFilter, Search, UserPlus } from "lucide-react";
// import Input from "./Input";
import img from "../../assets/profile.jpg";
import { NavLink, Outlet } from "react-router-dom";
import Button from "../../components/Button";
import { useCallback, useState } from "react";
import { api } from "../../services/auth";
import { Endpoints } from "../../api-service/endpoints/endpoint";
import { useMutation } from "@tanstack/react-query";
import { sentRequest } from "../../api-service/friend";
import { useProfileData } from "../../hooks/useProfileData";

export default function Friends() {
  
  return (
    <div className="min-h-screen bg-[var(--input-bg)] max-w-[350px] w-[100%]">
      <ChatSideBarHeader />
    </div>
  );
}

function ChatSideBarHeader() {
  const [users, setUsers] = useProfileData();
  console.log(users);
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const sentFriendsReqMutaion = useMutation({
    mutationFn: sentRequest,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  console.log(searchData);
  function debounce(callback, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback(...args);
      }, delay);
    };
  }
  const search = useCallback(
    debounce(async function (value) {
      if (value.trim() !== "" && value.length >= 3) {
        const res = await api.get(`${Endpoints.friends.search}=${value}`, {
          withCredentials: true,
        });
        setSearchData(res?.data?.users);
      } else {
        setSearchData([]);
      }
    }, 600),
    []
  );
  function listSerach({ username, _id, bgColor }) {
    const alreadySent = users?.friendRequestsSent?.includes(_id);
    const friend = users?.friends?.includes(_id);
    
    return (
      <ChatItem
        key={_id}
        name={username}
        bgColor={bgColor}
        buttons={
          <div className="">
            {
              alreadySent ? <Button
              onClick={() => sentFriendsReqMutaion.mutate(_id)}
              className={`px-3 py-1 text-white 
             bg-[#2563EB] hover:bg-[#2563EB]/80
          text-[13px] `}
            >
              Cancel
            </Button> : friend ? <Button
              onClick={() => sentFriendsReqMutaion.mutate(_id)}
              className={`px-3 py-1 text-white 
             bg-[#2563EB] hover:bg-[#2563EB]/80
          text-[13px] `}
            >
              Unfriend
            </Button> : <Button
              onClick={() => sentFriendsReqMutaion.mutate(_id)}
              className={`px-3 py-1 text-white 
             bg-[#2563EB] hover:bg-[#2563EB]/80
          text-[13px] `}
            >
              Request
            </Button>
            }
            
          </div>
        }
      />
    );
  }

  return (
    <div className="flex flex-col p-4 pb-0 gap-5 ">
      <div className="flex items-center justify-between h-full">
        <h3 className=" text-[20px] font-bold text-[var(--primary-text-color)]">
          Manage Friends
        </h3>
        {/* <div className="flex items-center gap-4">
          <Button>
            <UserPlus color="#0088CC" size={24} />
          </Button>
          <Button>
            <ListFilter color="#0088CC" size={24} />
          </Button>
        </div> */}
      </div>
      <div className="relative">
        <Search
          color="var(--primary-text-color)"
          size={14}
          className="absolute top-[50%] left-2  translate-y-[-50%] rotate-90 "
        />
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-[var(--bg-color)] transi duration-300 border-b-[2px] border-b-[var(--primary-text-color)] focus:border-b-[#0088CC] outline-none  py-1.5 rounded-[6px] pl-8  text-[var(--primary-text-color)]"
          onChange={(e) => {
            search(e.target?.value), setSearchValue(e.target?.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[200px]">
        {searchValue.length >= 3 ? (
          searchData.length > 0 ? (
            searchData.map(listSerach)
          ) : (
            <div className="text-center text-[16px] font-medium italic text-[var(--secondary-text-color)]">
              Not found
            </div>
          )
        ) : null}
      </div>

      <div className="flex  border border-amber-50 rounded-[6px] overflow-hidden">
        <NavLink
          className={({
            isActive,
          }) => `hover:bg-[var(--secondary-text-color)]/20 transition-all duration-300 flex-1 p-2 text-center text-[var(--primary-text-color)] bg-[var(--input-bg)]/10"  
        ${isActive ? "bg-[var(--secondary-text-color)]/20" : ""}
        `}
          to="."
        >
          Pending
        </NavLink>

        <NavLink
          className={({
            isActive,
          }) => `hover:bg-[var(--secondary-text-color)]/20 border-l border-l-amber-50 transition-all duration-300 flex-1 p-2 text-center text-[var(--primary-text-color)] bg-[var(--input-bg)]/10" to="/req 
        ${isActive ? "bg-[var(--secondary-text-color)]/20" : ""}
        `}
          to="/friends/sent"
        >
          Sent
        </NavLink>
        <NavLink
          className={({
            isActive,
          }) => `hover:bg-[var(--secondary-text-color)]/20 border-l border-l-amber-50 transition-all duration-300 flex-1 p-2 text-center text-[var(--primary-text-color)] bg-[var(--input-bg)]/10" to="/req 
        ${isActive ? "bg-[var(--secondary-text-color)]/20" : ""}
        `}
          to="/friends/blocked"
        >
          Blocked
        </NavLink>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100vh-150px)]">
        <Outlet />
      </div>
    </div>
  );
}

export function ChatList({ buttons, name, bgColor }) {
  return (
    <div>
      <ChatItem buttons={buttons} name={name} bgColor={bgColor} />
    </div>
  );
}

export function ChatItem({ buttons, name, bgColor }) {
  let letter = name?.charAt(0);
  return (
    <div className="bg-[var(--border-color)] px-4 py-2 flex gap-2 items-center justify-between rounded-[6px] hover:bg-[var(--border-color)]/70 transition-all duration-100">
      <div className="flex items-center justify-between gap-3">
        <div
          style={{ backgroundColor: bgColor }}
          className={`rounded-[50%] overflow-hidden w-[40px] h-[40px] flex items-center justify-center uppercase text-2xl font-bold `}
        >
          {letter}
        </div>
        <span className="text-[var(--primary-text-color)] text-[16px] font-semibold w-[60px] truncate">
          {name}
        </span>
      </div>
      {buttons}
    </div>
  );
}
