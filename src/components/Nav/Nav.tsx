import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import novaLogo from "../../assets/home/nova-nav.svg";
import "./Nav.less";

const navItems = [
  {
    to: "/",
    displayText: "Home",
    id: "homeLink",
    end: true,
  },
  {
    to: "/about",
    displayText: "About Us",
    id: "aboutLink",
  },
  {
    to: "/services",
    displayText: "Services",
    id: "servicesLink",
  },
  {
    to: "/contact",
    displayText: "Contact",
    id: "contactLink",
  },
] as const;

export default function Nav() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const menuToggle = document.getElementById("menu-toggle") as HTMLInputElement | null;
    if (menuToggle) {
      menuToggle.checked = false;
    }
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <nav id="mainNav" className={isScrolled ? 'flex-col align-center jusitify-center scrolled' : 'flex-col align-center jusitify-center'}>
      <div className="center-content">
        <Link to="/">
          <img className="nova-logo" src={novaLogo} alt="Nova Facility Solutions" />
        </Link>
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">
          &#9776;
        </label>
        <ul className="nav-links">
          {navItems.map((navItem) => (
            <li key={navItem.id}>
              <NavLink
                id={navItem.id}
                to={navItem.to}
                end={"end" in navItem ? navItem.end : undefined}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {navItem.displayText}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
