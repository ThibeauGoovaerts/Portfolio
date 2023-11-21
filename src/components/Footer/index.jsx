import React from "react";

const Footer = () => {
  // get current year
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-10 dark:text-white text-black opacity-80 text-xs">
      <p>
        © {year}{" "}
        <a
          href="/"
          className="text-primary-color"
          aria-label="Thibeau Goovaerts"
        >
          Thibeau Goovaerts
        </a>{" "}
        — All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
