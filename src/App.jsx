import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detailed from "./pages/Detailed.jsx";
import NftMetadata from "./pages/NftMetadata.jsx";
import TokenBalance from "./pages/TokenBalance.jsx";
import Transactions from "./pages/Transactions.jsx";
import Trading from "./pages/Trading.jsx";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import { UserCircle, LayoutDashboard } from "lucide-react";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            text="Home"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Trading"
            to="/Trading"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="NFT Metadata"
            to="/nft-metadata"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Transactions"
            to="/transactions"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Token Balance"
            to="/token-balance"
          />
          <hr className="my-3" />
        </Sidebar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/page/:pageNumber" element={<Home />}></Route>
          <Route path="/categories" element={<Home />}></Route>
          <Route path="/Trading" element={<Trading />}></Route>
          <Route path="/:id" element={<Detailed />}></Route>
          <Route path="/nft-metadata" element={<NftMetadata />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
          <Route path="/token-balance" element={<TokenBalance />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
