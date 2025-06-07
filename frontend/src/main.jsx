import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.jsx";
import "./index.css";
import App from "./App.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectRoute from "./components/ProtectRoute.jsx";
import './styles/variables.css'
import Profile from "./pages/Profile.jsx";
import PrivateChat from "./pages/PrivateChat.jsx";
import Friends from "./pages/friends/Friends.jsx";
import Calls from "./pages/Calls.jsx";
import Pending from "./pages/friends/Pending.jsx";
import Sent from "./pages/friends/Sent.jsx";
import Blocked from "./pages/friends/Blocked.jsx";


const queryClient = new QueryClient()
// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//   document.documentElement.classList.add('dark');
// } else {
//   document.documentElement.classList.remove('dark');
// }


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <App />
      </ProtectRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "friends",
        element: <Friends />,
        children: [
          {
            index:true,
            element: <Pending />,
          },
          {
            path: "sent",
            element: <Sent />,
          },
          {
            path: "blocked",
            element: <Blocked />,
          },
        ],
      },
      {
        path: "calls",
        element: <Calls />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "chat/:chatId",
        element: <PrivateChat />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
]);


createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient} >
    <RouterProvider router={router} />
    <ToastContainer />
  </QueryClientProvider>
  
);
