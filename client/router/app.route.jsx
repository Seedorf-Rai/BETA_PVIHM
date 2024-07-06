import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../src/App";
import UserLayout from "../layouts/user";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Provider store={store}>
        <UserLayout></UserLayout>
      </Provider>,
      children : [
        {
          path: "contact",
          element : <App></App>
        }
      ]
    }
  ]);

export default router