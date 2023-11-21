import React, { useEffect, useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // Function to toggle the visibility of the "scroll to top" button based on the scroll position.

    if (window.pageYOffset > 300) {
      setIsVisible(true); // If the scroll position is greater than 300 pixels, set the button to be visible.
    } else {
      setIsVisible(false); // Otherwise, set the button to be hidden.
    }
  };

  const scrollToTop = () => {
    // Function to scroll to the top of the page when the button is clicked.
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling behavior for a more pleasant scroll animation.
    });
  };

  useEffect(() => {
    // Add a scroll event listener to toggle the visibility of the button.
    window.addEventListener("scroll", toggleVisibility);

    // Remove the event listener when the component is unmounted to prevent memory leaks.
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8">
      <button
        type="button"
        aria-label="Scroll To Top"
        onClick={scrollToTop}
        className={`${
          isVisible ? "opacity-100" : "opacity-0"
        } bg-[#27b173] w-10 h-10 hover:bg-[#1e9962] cursor-pointer inline-flex items-center justify-center rounded-full p-3 text-[#fff] shadow-sm transition-all duration-200 ease-in focus:outline-none`}
      >
        <BiSolidUpArrow className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ScrollToTop;
