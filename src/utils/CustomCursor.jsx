import gsap from "gsap"; // Import the GreenSock Animation Platform library.
import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null); // Create a reference for the cursor element.
  const followerRef = useRef(null); // Create a reference for the follower element.

  // Function to move the cursor to the mouse position.
  const moveCursor = (e) => {
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
    });
    gsap.to(followerRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
    });
  };

  // Function to handle cursor style changes when hovering over a link.
  const handleLinkHover = (e) => {
    gsap.to(cursorRef.current, {
      width: 20,
      height: 20,
      opacity: 0.5,
      duration: 0.2,
      marginTop: "-10px",
      marginLeft: "-10px",
    });
  };

  // Function to handle cursor style changes when leaving a link.
  const handleLinkLeave = (e) => {
    gsap.to(cursorRef.current, {
      width: 6,
      height: 6,
      opacity: 1,
      duration: 0.2,
      marginTop: "-3px",
      marginLeft: "-3px",
    });
  };

  // useEffect hook to set up cursor and event listeners when the component is mounted.
  useEffect(() => {
    // Initialize the cursor and follower positions and styles using GreenSock.
    gsap.set(cursorRef.current, {
      xPercent: 0,
      yPercent: 0,
      width: 6,
      height: 6,
      marginTop: "-3px",
      marginLeft: "-3px",
    });
    gsap.set(followerRef.current, {
      xPercent: -40,
      yPercent: -40,
    });

    // Add a mousemove event listener to track mouse movement and update the cursor position.
    window.addEventListener("mousemove", moveCursor);

    // Get all anchor (a) tags in the document.
    const aTags = document.getElementsByTagName("a");

    // Add event listeners for link hover and leave for each anchor tag.
    for (let i = 0; i < aTags.length; i++) {
      aTags[i].addEventListener("mouseenter", handleLinkHover);
      aTags[i].addEventListener("mouseleave", handleLinkLeave);
    }

    // Clean up and remove event listeners when the component is unmounted.
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      for (let i = 0; i < aTags.length; i++) {
        aTags[i].removeEventListener("mouseenter", handleLinkHover);
        aTags[i].removeEventListener("mouseleave", handleLinkLeave);
      }
    };
  }, []);

  return (
    <div>
      {/* Render the cursor follower element. */}
      <div
        ref={followerRef}
        className="circle-cursor follower-cursor max-md:hidden"
      />

      {/* Render the main cursor element. */}
      <div ref={cursorRef} className="circle-cursor cursor max-md:hidden" />
    </div>
  );
};

export default CustomCursor;
