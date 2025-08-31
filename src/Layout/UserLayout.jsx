import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

function UserLayout() {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main content */}
      <main className="bg-secondary">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default UserLayout;

// #0e203e
