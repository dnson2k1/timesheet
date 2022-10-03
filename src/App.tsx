import "./App.scss";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRouter } from "./routers";

import React from "react";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";

import { getToken } from "./utils/localStorage";
import { useAppSelector } from "./hooks/hooks";

function App() {
  const { accessToken } = useAppSelector((state) => state.loginReducer);
  return (
    <BrowserRouter>
      <Routes>
        {publicRouter.map((rou, index) => {
          const Component = rou.component;
          const token = getToken();
          return (
            <Route
              key={index}
              path={rou.path}
              element={
                token ? (
                  <Layout>
                    <Component />
                  </Layout>
                ) : (
                  <Login />
                )
              }
            />
          );
        })}
      </Routes>
      <ToastContainer
        style={{ minWidth: "200px", fontSize: "15px" }}
        position="bottom-right"
        autoClose={2000}
      />
    </BrowserRouter>
  );
}

export default App;
