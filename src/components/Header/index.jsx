import React, { useEffect, useState } from "react";
import "./header.css";
import { TbSlashes } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import Theme from "./Theme";
import Logo from "../../assets/logo1.png";
import LogoDark from "../../assets/logo-dark.png";
import { Slide } from "../../animation/Slide";

const Header = ({ theme, setTheme }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const navigate = useNavigate();

  // Header links data
  const data = [
    {
      title: "home",
      href: "/",
    },
    {
      title: "project",
      href: "/project",
    },
    {
      title: "blog",
      href: "/blog",
    },
    {
      title: "photos",
      href: "photos",
    },
  ];

  // to run setScrollNav() when the page is scrolled to 80 px
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    // Check if the URL contains a hash
    if (location.hash) {
      // Smooth scroll to the target section
      const targetSection = document.querySelector(location.hash);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]); // Trigger when the hash in the URL changes

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  return (
    <header className="dark:text-white text-black relative z-50">
      <Slide delay={0.1}>
        <nav
          className={`${
            scrollNav
              ? "scroll-header dark:bg-[rgba(26,26,26,0.6)] bg-[rgba(26,26,26,0.05)]"
              : "overflow-hidden"
          } pt-4 pb-4 max-md:pt-3 max-md:pb-3 flex items-center justify-between w-full mx-auto px-28 max-xl:px-4`}
        >
          <div className="flex items-center gap-4">
            <a href="/" aria-label="Thibeau Goovaerts" className="w-48 h-10">
              <img
                src={theme === "dark" ? Logo : LogoDark}
                alt="Thibeau Goovaerts"
                className="w-full h-full object-cover"
              />
            </a>
          </div>

          {/* Menu */}
          <div className="max-md:hidden block">
            <ul className="text-[0.9rem] font-bold flex gap-8 max-lg:gap-4">
              {data.map((link) => (
                <li className="header-item" key={link.title}>
                  <a
                    href={link.href}
                    className="relative flex items-center"
                    onClick={(e) => {
                      e.preventDefault(); // To prevent page refresh
                      navigate(`${link.href}`); // navigate ${link.href}
                    }}
                  >
                    <span className="header-text flex items-center">
                      <TbSlashes size={22} /> {link.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2">
            {/* Theme */}
            <Theme theme={theme} setTheme={setTheme} />

            {/* Mobile Menu */}
            <MobileMenu data={data} />
          </div>
        </nav>
      </Slide>
    </header>
  );
};

export default Header;
