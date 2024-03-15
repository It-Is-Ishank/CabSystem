import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Cabs from "../pages/Cabs";
import Bookings from "../pages/Bookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cabs",
        element : <Cabs/>
      },
      {
        path: "/bookings",
        element : <Bookings/>
      }
    ],
  },
]);

export default router;
