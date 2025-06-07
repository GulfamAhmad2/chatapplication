import { Outlet } from "react-router-dom";
// import './App.css'
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <main className="flex bg-[var(--bg-color)] min-h-screen ">
        <div>
          <SideBar />
        </div>
        <Outlet />
      </main>
    </>
  );
}

export default App;
