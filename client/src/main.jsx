import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";

// import Signup from './pages/Signup.jsx';
// import Login from './pages/Login.jsx';

//import Signup from './pages/Signup.jsx';
//import Login from './pages/Login.jsx';
import Form from "./pages/Form.jsx";
//import Interview from './pages/Interview.jsx';
import NotFound from "./pages/NotFound.jsx";

//import Stats from './pages/Stats.jsx';

import Welcome from "./pages/Welcome.jsx";
// import Stats from './pages/Stats.jsx';
// import Welcome from './pages/Welcome.jsx';

//implement useContext

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,

        element: <Home />,
      },
      /*{
        path: '/login',
        element: <Login />
      }, /*{
        path: '/signup',
        element: <Signup />
      }, */ {
        path: "/welcome",

        element: <Welcome />,
      },
      //  {
      //   path: '/login',
      //   element: <Login />
      // },
      // {
      //   path: '/signup',
      //   element: <Signup />
      // },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      // {
      //   path: "/interview",
      //   element: <Interview />,
      // },
      //  {
      //   path: '/stats',
      //   element: <Stats />
      // }

      /* },/* {
        path: '/interview',
        element: <Interview />
      }, /*{
        path: '/stats',
        element: <Stats />*/
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
