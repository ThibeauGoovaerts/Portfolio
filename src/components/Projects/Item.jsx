import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Truncate } from "../../utils/TruncateText";
import { useNavigate } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../sanity";
import { Slide } from "../../animation/Slide";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const Item = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Slide delay={0.3}>
      <motion.div
        layout
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0.8, scale: 0.6 }}
        exit={{ opacity: 0.8, scale: 0.6 }}
        transition={{ duration: 0.3 }}
        className="portfolio__items card card-two min-h-[620px] pb-14 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-[rgba(24,24,27,0.4)] bg-[rgba(250,250,250,0.5)]"
      >
        <div className="portfolio__img-wrapper">
          {project?.image !== undefined ? (
            <a
              onClick={(e) => {
                e.preventDefault(); // To prevent page refresh
                navigate(`/project/${project?.slug.current}`); // navigate /project/${project?.slug.current} page
                window.scrollTo(0, 0); // Scroll to the top of the page.
              }}
              aria-label="Open project details"
              href={`/project/${project?.slug.current}`}
            >
              <img
                src={urlFor(project?.image.asset._ref)}
                alt={project?.image.alt || project?.title}
                className="portfolio__img"
              />
            </a>
          ) : (
            ""
          )}
        </div>
        <span className="portfolio__category text-[#27b173]">
          {project?.category[0].title}
        </span>
        <a
          onClick={(e) => {
            e.preventDefault(); // To prevent page refresh
            navigate(`/project/${project?.slug.current}`); // navigate /project/${project?.slug.current} page
            window.scrollTo(0, 0); // Scroll to the top of the page.
          }}
          aria-label="Open project details"
          href={`/project/${project?.slug.current}`}
          className="portfolio__title break-words text-xl font-medium"
        >
          {project?.title && Truncate(project?.title, 80)}
        </a>
        <div className="flex flex-col justify-between">
          <p className="portfolio__description dark:text-zinc-300 text-zinc-800">
            {project?.details && Truncate(project?.details, 200)}
          </p>
          <a
            onClick={(e) => {
              e.preventDefault(); // To prevent page refresh
              navigate(`/project/${project?.slug.current}`); // navigate /project/${project?.slug.current} page
              window.scrollTo(0, 0); // Scroll to the top of the page.
            }}
            aria-label="Open project details"
            href={`/project/${project?.slug.current}`}
            className="flex items-center gap-2 group transition-all duration-200 ease-in text-[#27b173] absolute bottom-5"
          >
            See Details
            <FaArrowRight className="transition-all duration-200 ease-in link__icon group-hover:ml-[6px]"></FaArrowRight>
          </a>
        </div>
      </motion.div>
    </Slide>
  );
};

export default Item;
