import React, { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createStore } from "redux";
import { legacy_createStore as createStore } from "redux";

import rootReducer from "./reducers/root";

import Blog from "./pages/dashboard/Blog";
import FAQ from "./pages/dashboard/FAQ";
import Quote from "./pages/dashboard/Quote";
import Service from "./pages/dashboard/Service";
import Testimonial from "./pages/dashboard/Testimonial";
import User from "./pages/dashboard/User";
import Profile from "./pages/dashboard/Profile";
import Contact from "./pages/dashboard/Contact";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login/Login.jsx";
import Overview from "./pages/dashboard/Overview";
import NoMatch from "./components/commons/NoMatch";
import CustomSwitch from "./components/commons/CustomSwitch";
const store = createStore(rootReducer);

const App = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <CustomSwitch>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="blog" element={<Blog />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="quote" element={<Quote />} />
            <Route path="service" element={<Service />} />
            <Route path="testimonial" element={<Testimonial />} />
            <Route path="contact" element={<Contact />} />
            <Route path="user" element={<User />} />
            <Route path="profile" element={<Profile />} />
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
