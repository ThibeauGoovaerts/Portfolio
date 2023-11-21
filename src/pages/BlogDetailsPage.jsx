import React from "react";
import Breadcrumb from "../utils/Breadcrumb";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../sanity";
import { PortableText } from "@portabletext/react";
import { components } from "../utils/PortableTextOptions";
import { BiCalendar } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import SanityService from "../services/sanityService";
import { useEffect } from "react";
import { useState } from "react";
import { Slide } from "../animation/Slide";
import SharePost from "../components/SharePost";
import moment from "moment";
import FeaturedPosts from "../components/FeaturedPosts";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const BlogDetailsPage = () => {
  const navigate = useNavigate();
  const params = useParams(); // Retrieves route parameters
  const slug = params.slug; // Extracts the slug from route parameters

  const [post, setPost] = useState();

  /* GET BLOG POST DATA BY SLUG FROM SANITY SERVICE */
  /* SLUG = ID */
  const getPostDetails = (slug) => {
    SanityService.getDataBySlug("post", slug) // Fetches blog post data using the 'slug' as an identifier
      .then((response) => {
        setPost(response);
      })
      .catch((error) => {
        console.log(error); // Logs any errors that occur during the fetch
      });
  };

  useEffect(() => {
    getPostDetails(slug); // Calls the 'getPostDetails' function when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling behavior for a more pleasant scroll animation.
    });
  }, []);

  useEffect(() => {
    if (post === null) {
      navigate("/"); // Navigates back to the home page if the 'post' is null
    }
  }, [post]);

  return (
    <section className="container2 section dark:text-white text-black px-6">
      <Slide delay={0.1}>
        <header className="mb-8">
          <Breadcrumb location={"blog"} name={post?.title} />
        </header>
      </Slide>
      <article>
        <Slide
          className="flex lg:flex-row flex-col border-t dark:border-zinc-800 border-zinc-300"
          delay={0.1}
        >
          <div className="min-h-full w-1/2 max-lg:w-full lg:border-r border-r-0 dark:border-zinc-800 border-zinc-300 basis-3/4 pt-10 pb-4 lg:pr-6 px-0">
            <h1 className="font-incognito break-words font-semibold tracking-tight sm:text-[2.5rem] lg:leading-none leading-tight text-3xl mb-4">
              {post?.title}
            </h1>

            <div className="relative w-full h-auto mt-12">
              {post?.mainImage !== undefined ? (
                <img
                  className="rounded-xl border dark:border-zinc-800 border-zinc-300 object-cover"
                  src={urlFor(post?.mainImage.asset._ref)}
                  alt={post?.mainImage.alt || post?.title}
                />
              ) : (
                ""
              )}
            </div>

            {post?.body !== undefined ? (
              <div className="mt-8 dark:text-zinc-300">
                {/* With the @portabletext/react package, we print the description data from Sanity to the screen more regularly. */}
                <PortableText value={post?.body} components={components} />
              </div>
            ) : (
              ""
            )}
          </div>

          <aside className="flex flex-col lg:max-h-full h-max gap-y-8 sticky top-20 bottom-auto right-0 basis-1/4 py-10 lg:px-6 px-0">
            <section className="border-b dark:border-zinc-800 border-zinc-300 pb-10">
              <p className="dark:text-zinc-400 text-zinc-800 text-sm">
                Written By:
              </p>
              <address className="flex items-center gap-x-3 mt-4 not-italic">
                <div className="w-12 h-12">
                  {post?.author.image !== undefined ? (
                    <img
                      src={urlFor(post?.author.image.asset._ref)}
                      className="w-full object-cover h-full rounded-full"
                      alt={post?.author.image.alt || "Thibeau Goovaerts"}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <h3 className="font-semibold dark:text-zinc-200 text-zinc-800 text-lg tracking-tight">
                    {post?.author.name}
                  </h3>
                </div>
              </address>
              <div className="flex items-center gap-x-4 text-md mt-4 dark:text-zinc-400 text-zinc-600">
                <div className="flex items-center gap-x-2">
                  <BiCalendar />
                  <time
                    dateTime={moment(post?.publishedAt).format("MMM D, YYYY")}
                  >
                    {moment(post?.publishedAt).format("MMM D, YYYY")}
                  </time>
                </div>
              </div>
            </section>

            {post?.tags !== undefined ? (
              <section className="border-b dark:border-zinc-800 border-zinc-300 pb-10">
                <h3 className="text-xl font-semibold tracking-tight mb-4">
                  Tags
                </h3>
                <ul className="flex flex-wrap items-center gap-2 tracking-tight">
                  {post?.tags.map((tag, i) => (
                    <li
                      key={i}
                      className="border dark:border-zinc-800 border-zinc-300 rounded-md px-2 py-1 text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              ""
            )}

            {/* share post component */}
            <SharePost
              title={post?.title}
              slug={post?.slug.current}
              description={post?.details}
            />

            {/* featured post component */}
            <FeaturedPosts />
          </aside>
        </Slide>
      </article>
    </section>
  );
};

export default BlogDetailsPage;
