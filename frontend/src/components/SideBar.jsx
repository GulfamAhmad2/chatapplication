import { useToggle } from "../hooks/useToggle";
import profile from "../assets/profile.jpg";
import {
  Menu,
  MessageSquareMore,
  Phone,
  Settings,
  UserPlus,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function SideBar() {
  const [isOpen, toggle] = useToggle();
  return (
    <div
      className={` ${
        !isOpen ? "w-[50px]" : "w-[200px]"
      } bg-[var(--border-color)]  min-h-screen flex flex-col justify-between transition-all duration-300`}
    >
      <div className="border-b-1 border-[var(--secondary-text-color)]/50">
        <button
          className="pt-4 p-3 cursor-pointer mb-2"
          onClick={() => toggle()}
        >
          <Menu color="#0088CC" />
        </button>
        <div className="flex flex-col gap-2.5 ">
          <IconCard to='/' title="Chats" isOpen={isOpen}>
            <MessageSquareMore color="#0088CC" size={20} />
          </IconCard>
          <IconCard to='/calls' title="Calls" isOpen={isOpen}>
            <Phone color="#0088CC" size={20} />
          </IconCard>
          <IconCard to="/friends" title="Manage Friends" isOpen={isOpen}>
            <UserPlus color="#0088CC" size={24} />
          </IconCard>
        </div>
      </div>
      <div className="border-t-1 border-[var(--secondary-text-color)]/50 flex flex-col gap-1">
        <IconCard to='/settings' title="Settings" isOpen={isOpen}>
          <Settings color="#0088CC" size={20} />
        </IconCard>
        <IconCard to="/profile" title="Profile" isOpen={isOpen}>
          <div className="rounded-[50%] w-[24px] h-[24px] overflow-hidden">
            <img src={profile} alt="profile-img" />
          </div>
        </IconCard>
      </div>
    </div>
  );
}

function IconCard({ children, title, isOpen, to, toggle }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 py-2 px-3 rounded-[6px] hover:bg-[var(--bg-color)]/50 cursor-pointer ${
          isActive
            ?  "bg-[var(--bg-color)] text-[var(--primary-text-color)] font-semibold"
            : ""
        }`
      }
    >
      {children}
      {isOpen && (
        <span className="text-[14px] tracking-wider font-medium text-[var(--primary-text-color)]">
          {title}
        </span>
      )}
    </NavLink>
  );
}
