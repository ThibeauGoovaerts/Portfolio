import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineX } from "react-icons/hi";
import { TbSlashes } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const MobileMenu = ({ data }) => {
  const [navShow, setNavShow] = useState(false);
  const navigate = useNavigate();

  // The function that works when the mobile menu is opened
  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // To prevent page scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // page width height information trigger
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  // To enable page scrolling if the page width is above 768px
  useEffect(() => {
    if (dimensions.width >= 768) {
      setNavShow(() => {
        document.body.style.overflow = "auto";
        return false;
      });
    }
  }, [dimensions]);

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

  return (
    <>
      <button
        onClick={onToggleNav}
        aria-label="Open Mobile Menu"
        className="md:hidden dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-300 rounded-md p-2"
      >
        <RxHamburgerMenu className="text-xl" />
      </button>
      <div
        className={`md:hidden fixed left-0 top-0 z-50 h-screen w-full transform duration-[600ms] ease-[cubic-bezier(0.7,0,0,1)] bg-secondary-bg dark:bg-zinc-900 ${
          navShow ? "translate-x-0 rounded-none" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mt-6 px-8">
          <div className="flex items-center">
            <a
              href="/"
              className={`text-lg font-bold flex items-center`}
              aria-label="Thibeau Goovaerts"
            >
              Thibeau Goovaerts
            </a>
          </div>

          <button
            onClick={onToggleNav}
            aria-label="Close Mobile Menu"
            className={`md:hidden dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-300 rounded-full p-2 duration-500 ${
              !navShow ? "-rotate-[360deg]" : null
            }`}
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col h-full">
          <ul className="mx-auto flex flex-col justify-center h-[calc(100%-64px)]">
            {data.map((link) => (
              <li className="header-item" key={link.title}>
                <a
                  href={link.href}
                  className="flex items-center mobile-link w-fit relative gap-x-2 font-incognito font-semibold text-lg dark:shadow-line-dark shadow-line-light p-6 group"
                  onClick={(e) => {
                    e.preventDefault(); // To prevent page refresh
                    onToggleNav();
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
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
