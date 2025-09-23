import Warning from "../components/Warning";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

function Header() {
  return (
    <header>
      {/* Warning */}
      <Warning />
      {/* Topbar */}
      <Topbar />
      {/* Navbar */}
      <Navbar />
      {/* Cart Drawer */}
    </header>
  );
}

export default Header;
