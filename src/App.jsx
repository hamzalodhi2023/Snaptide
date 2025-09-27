// src/App.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import AuthInitializer from "./components/AuthInitializer";

// Pages and Layout
import UserLayout from "./Layout/UserLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Google from "./pages/Google";
import Error from "./pages/Error";
import SetPassword from "./pages/SetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Otp from "./pages/Otp";
import Tools from "./pages/Tools";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* ⬇️ Token refresh + Profile fetch here */}
        <AuthInitializer />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <Routes>
          {/* ✅ Routes WITHOUT layout */}
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="*" element={<Error />} />

          {/* ✅ Routes WITH layout */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="google/callback" element={<Google />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/verify-account" element={<Otp />} />
            <Route path="/tools" element={<Tools />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
