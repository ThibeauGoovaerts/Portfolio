import React from "react";
import { BiCalendar } from "react-icons/bi";
import { Slide } from "../../animation/Slide";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../sanity";
import { useNavigate } from "react-router-dom";
import { Truncate } from "../../utils/TruncateText";
import moment from "moment";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const Item = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Slide delay={0.3}>
      <article>
        <a
          href={`/blog/${post?.slug.current}`}
          onClick={(e) => {
            e.preventDefault(); // To prevent page refresh
            navigate(`/blog/${post?.slug.current}`); // navigate /blog/:slug page
            window.scrollTo(0, 0); // Scroll to the top of the page.
          }}
          className="flex lg:flex-row flex-col lg:items-center gap-8 p-6 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-[rgba(24,24,27,0.4)] bg-[rgba(250,250,250,0.5)] group"
        >
          <div className="relative lg:w-[450px] lg:h-52 w-full h-56 overflow-clip">
            {post?.mainImage !== undefined ? (
              <img
                src={urlFor(post?.mainImage.asset._ref)}
                alt={post?.mainImage.alt || post?.title}
                className="dark:bg-zinc-800 w-full bg-zinc-100 rounded-md object-cover group-hover:scale-110 duration-300"
              />
            ) : (
              ""
            )}
          </div>
          <div className="max-w-lg">
            <h2 className="text-2xl break-words font-semibold tracking-tight mb-4">
              {post?.title && Truncate(post?.title, 80)}
            </h2>
            <p className="dark:text-zinc-300 text-zinc-600 text-[15.5px]">
              {post?.details && Truncate(post?.details, 200)}
            </p>
            <div className="flex items-center max-sm:flex-col max-sm:items-start gap-x-4 max-sm:gap-y-2 mt-4 text-sm">
              {post?.author !== undefined ? (
                <div className="flex max-sm:flex-col items-center max-sm:items-start gap-2">
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
                  <span>{post?.author.name}</span>
                </div>
              ) : (
                ""
              )}

              <div className="flex items-center gap-x-2">
                <BiCalendar />
                <time
                  dateTime={moment(post?.publishedAt).format("MMM D, YYYY")}
                >
                  {moment(post?.publishedAt).format("MMM D, YYYY")}
                </time>
              </div>
            </div>
          </div>
        </a>
      </article>
    </Slide>
  );
};

export default Item;
