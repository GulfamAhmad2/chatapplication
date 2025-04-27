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
import './styles/variables.css'


const queryClient = new QueryClient()
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
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
