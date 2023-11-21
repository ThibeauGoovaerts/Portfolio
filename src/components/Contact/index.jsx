import React from "react";
import { Slide } from "../../animation/Slide";
import { useNavigate } from "react-router-dom";
import Social from "./Social";
import { AiOutlinePhone } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";

const Contact = ({ contact }) => {
  const navigate = useNavigate();

  return (
    <section
      id="contact"
      className="section dark:text-white text-black border-t dark:border-[rgba(39,39,42,1)] border-[rgba(219,219,238)] mt-10"
    >
      <Slide delay={0.3}>
        <div className="container2 flex gap-4 max-md:flex-col items-center max-md:items-start max-md:gap-10 justify-between">
          <div>
            <h3 className="text-6xl max-sm:text-4xl">Get in touch</h3>
            <p className="my-[20px] max-w-xl text-xl max-sm:text-base dark:text-zinc-300 text-zinc-600">
              {contact?.title}
            </p>
            <a
              href={`mailto:${contact?.email}`}
              className="flex px-10 py-5 items-center w-fit justify-center text-center gap-x-2 dark:bg-[rgba(39,39,43,.4)] bg-zinc-200 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-300 rounded-md text-base max-sm:text-sm font-incognito font-semibold"
            >
              Send me an email
            </a>
            <div className="flex flex-col gap-4 mt-5">
              {contact?.address !== undefined ? (
                <div className="flex items-center gap-2">
                  <BiHomeAlt size={22} />
                  <span>{contact?.address}</span>
                </div>
              ) : (
                ""
              )}
              {contact?.phone !== undefined ? (
                <div className="flex items-center gap-2">
                  <AiOutlinePhone size={22} />
                  <span>{contact?.phone}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <ul className="flex flex-col gap-3 uppercase">
            <li className="text-xl max-sm:text-lg dark:text-zinc-300 text-zinc-700 font-bold hover:text-[#27B173] dark:hover:text-[#27B173] transition-all duration-200 ease-in">
              <a
                href="/project"
                onClick={(e) => {
                  e.preventDefault(); // To prevent page refresh
                  navigate("/project"); // navigate /project page
                  window.scrollTo(0, 0); // Scroll to the top of the page.
                }}
              >
                Projects
              </a>
            </li>
            <li className="text-xl max-sm:text-lg dark:text-zinc-300 text-zinc-700 font-bold hover:text-[#27B173] dark:hover:text-[#27B173] transition-all duration-200 ease-in">
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault(); // To prevent page refresh
                  navigate("/blog"); // navigate /blog page
                  window.scrollTo(0, 0); // Scroll to the top of the page.
                }}
              >
                Blogs
              </a>
            </li>
            <li className="flex gap-4 flex-wrap mt-4">
              {/* social links component */}
              <Social />
            </li>
          </ul>
        </div>
      </Slide>
    </section>
  );
};

export default Contact;
