import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SanityService from "../services/sanityService";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../sanity";
import { BiCalendar } from "react-icons/bi";
import moment from "moment";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const FeaturedfeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState();
  const [post, setPost] = useState();

  const params = useParams();
  const slug = params.slug;

  /* GET PORTRFOLIO DATA FROM SANITY SERVICE */
  const getProjects = () => {
    SanityService.getData("post") // Fetch data of type "post" from Sanity.io.
      .then((response) => {
        // Filter and set featured posts, excluding the current post with the same slug.
        setFeaturedPosts(
          response.filter((post) => post.featured && post.slug.current !== slug)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProjects(); // Call the function to fetch featured posts when the component mounts.
  }, []);

  useEffect(() => {
    setPost(
      featuredPosts &&
        featuredPosts[Math.floor(Math.random() * featuredPosts?.length)]
    ); // Set a random post from the featured posts when they are available.
  }, [featuredPosts]);

  return post?.slug.current !== slug && featuredPosts?.length > 0 ? ( // Check if the current post is different from the random post.
    <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
      <h3 className="text-xl font-semibold tracking-tight mb-4">Featured</h3>
      <article className={`mb-4 flex lg:flex-row flex-col`}>
        <a
          href={`/blog/${post?.slug.current}`}
          className="flex flex-col gap-4 max-w-[220px] max-lg:max-w-full dark:bg-primary-bg bg-secondary-bg p-5 rounded-lg border dark:border-zinc-800 border-zinc-200"
        >
          {post?.mainImage !== undefined ? (
            <img
              src={urlFor(post?.mainImage?.asset._ref)}
              className="dark:bg-zinc-800 w-full h-auto max-lg:h-72 bg-zinc-100 rounded-md object-cover"
            />
          ) : (
            ""
          )}
          <div className="max-w-lg">
            <h2 className="max-w-sm text-lg break-words truncate tracking-tight">
              {post?.title}
            </h2>
            <div className="flex items-center gap-x-2 text-sm my-2">
              <BiCalendar />
              <time dateTime={moment(post?.publishedAt).format("mmm ddd yyyy")}>
                {moment(post?.publishedAt).format("MMM D, YYYY")}
              </time>
            </div>
            <p className="dark:text-zinc-400 text-zinc-600 text-sm">
              {post?.details.slice(0, 80).padEnd(83, "...")}
            </p>
          </div>
        </a>
      </article>
    </section>
  ) : (
    ""
  );
};

export default FeaturedfeaturedPosts;
