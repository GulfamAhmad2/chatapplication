import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectRoute from "./components/ProtectRoute.jsx";

const queryClient = new QueryClient()
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
        path: "/about",
        element: <About />,
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
