import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./AllRoutes";
import Private from "./Private";
import Public from "./Public";

const Index = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Routes>
        {AllRoutes.map((item) => {
          return (
            <Route exact element={item.private ? <Private /> : <Public />}>
              <Route
                key={item.name}
                exact={item.exact}
                path={item.path}
                name={item.name}
                element={item.component}
              />
            </Route>
          );
        })}
      </Routes>
    </>
  );
};

export default Index;
