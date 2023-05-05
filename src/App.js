import React, { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from "redux";

import rootReducer from "./reducers/rootReducer";

import { Blogs } from "./components";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import Overview from "./components/Overview";
import NoMatch from "./components/NoMatch";
import Messages from "./components/Messages";
import CustomSwitch from "./components/CustomSwitch";

const store = createStore(rootReducer);
const App = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Messages />
        <CustomSwitch>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </CustomSwitch>
      </BrowserRouter>
    </ReduxProvider>
  );
};
export default App;
export { store };
