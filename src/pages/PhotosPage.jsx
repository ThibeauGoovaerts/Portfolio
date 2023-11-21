import React, { useEffect, useState } from "react";
import Breadcrumb from "../utils/Breadcrumb";
import sanityClient from "../../sanity";
import imageUrlBuilder from "@sanity/image-url";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { motion } from "framer-motion";
import EmptyState from "../components/EmptyState";
import { Slide } from "../animation/Slide";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const PhotosPage = ({ photos }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page.
  }, []);

  const [lightbox, setLightbox] = useState({
    open: false,
    currentIndex: 0,
  });

  const lightboxItems = [
    photos?.map((photo) => ({
      src: urlFor(photo.image.asset._ref),
      title: photo.title,
      description: photo.details,
    })),
  ];

  return (
    <main className="px-4 container2 section dark:text-white text-black">
      <Slide delay={0.2}>
        <div className="mb-8">
          <Breadcrumb name={"photos"} />
        </div>
        <h2 className="text-4xl font-bold">Photos</h2>
      </Slide>
      {photos?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {photos?.map((photo, i) => (
              <div key={photo._id} className="h-auto w-full">
                {photo?.image !== undefined ? (
                  <motion.img
                    layout
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0.8, scale: 0.6 }}
                    exit={{ opacity: 0.8, scale: 0.6 }}
                    transition={{ duration: 0.4 }}
                    className="h-full w-full rounded-lg cursor-zoom-in object-cover"
                    src={urlFor(photo?.image.asset._ref)}
                    alt={photo?.image.alt || "Thibeau Goovaerts"}
                    onClick={() =>
                      setLightbox({
                        open: true,
                        currentIndex: i,
                      })
                    }
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <Lightbox
            open={lightbox.open}
            close={() => setLightbox({ open: false, currentIndex: 0 })}
            slides={lightboxItems[0]}
            thumbnails={{ border: 0 }}
            plugins={[Zoom, Counter, Captions]}
            index={lightbox.currentIndex}
            className="z-[10000]"
            styles={{ container: { backgroundColor: "rgba(0, 0, 0, .6)" } }}
          />
        </>
      ) : (
        <EmptyState value="Photos" />
      )}
    </main>
  );
};

export default PhotosPage;
