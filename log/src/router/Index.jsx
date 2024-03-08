import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import App from "../App";
import Dragongame from '../Dragongame'
import Teoria from "../Teoria";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/home", element: <Home /> },
  { path: "/dragongame", element: <Dragongame /> },
  { path: "/teoria", element: <Teoria /> }

]);

export default router;
