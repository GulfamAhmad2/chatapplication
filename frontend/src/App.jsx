import {Outlet} from "react-router-dom"
// import './App.css'
function App() {
  return (
    <>
    {/* Sidebar yaha lado aur home me bus chat ka logic rakho is outlet ko main outlet banate hai */}
    <Outlet/>
    </>
  )
}

export default App
