import React, { useEffect, useState } from "react";
import SunIcon from "../../icons/SunIcon";
import MoonIcon from "../../icons/MoonIcon";

const Theme = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className={`dark:bg-primary-bg bg-zinc-100 dark:text-primary-color text-zinc-500 border dark:border-zinc-800 border-zinc-300 rounded-full p-2 duration-300 transition-transform group: ${
        theme !== "dark" ? "-rotate-180" : "rotate-0"
      }`}
      aria-label="Toggle Theme"
    >
      {theme !== "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default Theme;
