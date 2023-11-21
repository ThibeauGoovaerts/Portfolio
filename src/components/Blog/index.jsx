import React from "react";
import Item from "./Item";
import { useNavigate } from "react-router-dom";

const Blog = ({ posts }) => {
  const navigate = useNavigate();

  return posts?.length > 0 ? (
    <section
      id="blog"
      className="container2 section dark:text-white text-black"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-6xl max-md:text-4xl max-sm:text-3xl text-left">
          Latest Posts
        </h2>
        <a
          href="/blog"
          onClick={(e) => {
            e.preventDefault(); // To prevent page refresh
            navigate("/blog"); // navigate /blog page
            window.scrollTo(0, 0); // Scroll to the top of the page.
          }}
          className="flex px-8 items-center justify-center text-center gap-x-2 dark:bg-[rgba(39,39,43,.4)] bg-zinc-200 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-300 rounded-md py-2 text-base font-incognito font-semibold"
        >
          View all
        </a>
      </div>
      <div className="mt-20 flex flex-col gap-4">
        {posts?.map((post) => (
          <Item post={post} key={post?._id} />
        ))}
      </div>
    </section>
  ) : (
    ""
  );
};

export default Blog;
