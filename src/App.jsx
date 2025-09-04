import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import UserLayout from "./Layout/UserLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Google from "./pages/Google";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/google/callback" element={<Google />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
