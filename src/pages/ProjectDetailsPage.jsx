import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SanityService from "../services/sanityService";
import { PortableText } from "@portabletext/react";
import Breadcrumb from "../utils/Breadcrumb";
import { components } from "../utils/PortableTextOptions";
import { BiLinkExternal } from "react-icons/bi";
import PDFViewer from "../utils/PDFViewer";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../sanity";
import { Slide } from "../animation/Slide";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const params = useParams(); // Retrieves route parameters
  const slug = params.slug; // Extracts the slug from route parameters

  const [project, setProject] = useState();
  const [lightbox, setLightbox] = useState({
    // State for managing the lightbox
    open: false, // Indicates whether the lightbox is open or closed
    currentIndex: 0, // Index of the currently displayed image in the lightbox
  });

  /* GET PROJECT DATA BY SLUG FROM SANITY SERVICE */
  /* SLUG = ID */
  const getProjectDetails = (slug) => {
    SanityService.getDataBySlug("project", slug) // Fetches project data using the provided slug
      .then((response) => {
        setProject(response);
      })
      .catch((error) => {
        console.log(error); // Logs any errors that occur during the fetch
      });
  };

  useEffect(() => {
    getProjectDetails(slug);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling behavior for a more pleasant scroll animation.
    });
  }, []);

  useEffect(() => {
    if (project === null) {
      navigate("/"); // Navigates to the home page if project data is not found
    }
  }, [project]);

  // Array for the lightbox images.
  const lightboxItems = [
    project?.images?.map((item) => ({
      src: urlFor(item.asset._ref), // Creates an array of image sources for the lightbox
    })),
  ];

  // PDF file settings for project
  const [_file, id, extension] =
    project !== undefined && project?.file !== undefined
      ? project?.file.asset._ref.split("-")
      : "";

  return (
    <section className="px-4 container2 section dark:text-white text-black">
      <Slide delay={0.1}>
        <header className="mb-8">
          <Breadcrumb location={"project"} name={project?.title} />
        </header>
      </Slide>
      <div className=" mt-12">
        <div>
          <h5 className="text-2xl font-medium mb-5">{project?.title}</h5>

          <div className="relative w-full h-auto mt-12">
            {project?.image !== undefined ? (
              <img
                className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
                src={urlFor(project?.image.asset._ref)}
                alt={project?.image.alt || project?.title}
              />
            ) : (
              ""
            )}
          </div>

          {project?.link !== undefined ? (
            <a
              href={project?.link}
              target="_blank"
              rel="noreferrer noopener"
              className="flex mt-4 w-fit px-8 items-center justify-center text-center gap-x-2 bg-[rgba(39,39,43,.4)] border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-base font-incognito font-semibold"
            >
              <button className="flex items-center gap-2">
                <BiLinkExternal /> Details
              </button>
            </a>
          ) : (
            ""
          )}
          <br />
          {project?.body !== undefined ? (
            <div className="dark:text-zinc-300">
              {/* With the @portabletext/react package, we print the description data from Sanity to the screen more regularly. */}
              <PortableText value={project?.body} components={components} />
            </div>
          ) : (
            ""
          )}

          {project?.file !== undefined ? (
            <div className="mt-8">
              {/* Show the pdf from sanity.io on the screen */}
              <PDFViewer
                plugin
                pdf={`https://cdn.sanity.io/files/zk9p4t5n/production/${id}.${extension}`}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="porfoliopage mt-20">
          {/* carousel with swiper pack */}
          <Swiper
            spaceBetween={50}
            autoHeight
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination]}
            className="portfolio__container mySwiper mt-6 mb-10"
          >
            {project?.images?.map((item, i) => (
              <SwiperSlide
                className="portfolio__item cursor-pointer"
                key={i}
                onClick={() =>
                  setLightbox({
                    currentIndex: i,
                    open: true,
                  })
                }
              >
                <img
                  src={urlFor(item.asset._ref)}
                  alt=""
                  className="w-[50%] h-[50%] max-sm:w-full max-sm:h-full mx-auto rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Opening full screen when clicking on images with the Lightbox package */}
        <Lightbox
          open={lightbox.open}
          close={() => setLightbox({ open: false, currentIndex: 0 })}
          slides={lightboxItems[0]}
          thumbnails={{ border: 0 }}
          plugins={[Zoom, Counter]}
          index={lightbox.currentIndex}
          className="z-[10000]"
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
        />
      </div>
    </section>
  );
};

export default ProjectDetailsPage;
