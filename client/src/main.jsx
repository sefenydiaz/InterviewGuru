import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../../client/src/main.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Form from "./pages/Form.jsx";
import Questions from "./pages/Questions.jsx";
import Feedback from "./pages/Feedback.jsx";
import Stats from "./pages/Stats.jsx";
import NotFound from "./pages/NotFound.jsx";
import Welcome from "./pages/Welcome.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,

        element: <Login />,
      },
      {
        path: "/welcome",

        element: <Welcome />,
      },
      {
        path: "/questions",
        element: <Questions />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
