import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx"; 
import TodoButton from "../base/TodoButton";
import Logout from "../../container/LogoutContainer";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      navPage: "/",
      active: !user,
    },
    {
      name: "Sign in",
      navPage: "/signIn",
      active: !user,
    },
    {
      name: "Sign Up",
      navPage: "/signUp",
      active: !user,
    },
  ];

  return (
    <header className="py-3 shadow bg-[#f4f0ec] text-[#3B2F2F] font-semibold md:font-bold">
      <div className="md:flex">
        <nav className="flex">
          <div className="w-full mr-4 text-xl flex justify-between items-center font-bold ml-5">
            <Link to="/">
              Todo
            </Link>
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                ☰
              </button>
            </div>
          </div>
        </nav>
        <ul className={`md:flex ${menuOpen ? 'block' : 'hidden'} md:ml-auto mt-3 md:mt-0 gap-5 p-2`}>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name} className="mt-2 md:mt-0">
                <TodoButton
                  onClick={() => {
                    navigate(item.navPage);
                    setMenuOpen(false);
                  }}
                  className="inline-block px-6 py-2 duration-200 bg-gray-800 hover:bg-[#DCC7AA] rounded-full"
                >
                  {item.name}
                </TodoButton>
              </li>
            ) : null
          )}
          {user && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
