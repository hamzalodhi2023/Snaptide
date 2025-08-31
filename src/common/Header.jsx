import Navbar from "./Navbar";
import Topbar from "./Topbar";

function Header() {
  return (
    <header>
      {/* Topbar */}
      <Topbar />
      {/* Navbar */}
      <Navbar />
      {/* Cart Drawer */}
    </header>
  );
}

export default Header;
