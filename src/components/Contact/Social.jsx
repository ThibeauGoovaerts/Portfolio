import React, { useEffect, useState } from "react";
import SanityService from "../../services/sanityService";
import { FaXTwitter } from "react-icons/fa6";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoTumblr,
} from "react-icons/io";

const Social = () => {
  const [socials, setSocials] = useState();

  /* GET SOCIAL LINKS DATA FROM SANITY SERVICE */
  const getSocials = () => {
    SanityService.getData("social") // Fetch data of type "social" from Sanity.io.
      .then((response) => {
        setSocials(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSocials(); // Call the function to fetch social media links when the component mounts.
  }, []);

  return (
    <div className="flex gap-2 text-xl">
      <div className="flex gap-4 flex-wrap">
        {socials?.map(
          (social) =>
            social.link != "" && (
              <div key={social._id}>
                {social.name === "instagram" && social.link !== undefined ? (
                  <a
                    href={social.link}
                    aria-label="Open My Instagram Page"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="shadow-[#27B173_0px_0px_3px] cursor-pointer w-10 h-10 hover:scale-125 transition-all duration-200 ease-in rounded-full flex items-center justify-center"
                  >
                    <IoLogoInstagram size={20} />
                  </a>
                ) : social.name === "twitter" && social.link !== undefined ? (
                  <a
                    href={social.link}
                    rel="noreferrer noopener"
                    aria-label="Open My Twiter Page"
                    target="_blank"
                    className="shadow-[#27B173_0px_0px_3px] cursor-pointer w-10 h-10 hover:scale-125 transition-all duration-200 ease-in rounded-full flex items-center justify-center"
                  >
                    <FaXTwitter size={20} />
                  </a>
                ) : social.name === "linkedin" && social.link !== undefined ? (
                  <a
                    href={social.link}
                    target="_blank"
                    aria-label="Open My Linkedin Page"
                    rel="noreferrer noopener"
                    className="shadow-[#27B173_0px_0px_3px] cursor-pointer w-10 h-10 hover:scale-125 transition-all duration-200 ease-in rounded-full flex items-center justify-center"
                  >
                    <IoLogoLinkedin size={20} />
                  </a>
                ) : social.name === "facebook" && social.link !== undefined ? (
                  <a
                    href={social.link}
                    aria-label="Open My Facebook Page"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="shadow-[#27B173_0px_0px_3px] cursor-pointer w-10 h-10 hover:scale-125 transition-all duration-200 ease-in rounded-full flex items-center justify-center"
                  >
                    <IoLogoFacebook size={20} />
                  </a>
                ) : social.name === "github" && social.link !== undefined ? (
                  <a
                    href={social.link}
                    target="_blank"
                    aria-label="Open My Github Page"
                    rel="noreferrer noopener"
                    className="shadow-[#27B173_0px_0px_3px] cursor-pointer w-10 h-10 hover:scale-125 transition-all duration-200 ease-in rounded-full flex items-center justify-center"
                  >
                    <IoLogoGithub size={20} />
                  </a>
                ) : social.name === "tumblr" && social.link !== undefined ? (
                  <a
                    href={social.link}
                    aria-label="Open My Tumblr Page"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="shadow-[#27B173_0px_0px_3px] cursor-pointer w-10 h-10 hover:scale-125 transition-all duration-200 ease-in rounded-full flex items-center justify-center"
                  >
                    <IoLogoTumblr size={20} />
                  </a>
                ) : (
                  ""
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Social;
