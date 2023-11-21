import React, { useEffect } from "react";
import Item from "../components/Blog/Item";
import Breadcrumb from "../utils/Breadcrumb";
import SanityService from "../services/sanityService";
import { useState } from "react";
import EmptyState from "../components/EmptyState";
import { Slide } from "../animation/Slide";

const BlogsPage = () => {
  const [posts, setPosts] = useState();
  /* GET BLOG POSTS DATA FROM SANITY SERVICE */
  const getPosts = () => {
    SanityService.getDataWithAuthor("post") // Fetches blog posts data with authors
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        console.log(error); // Logs any errors that occur during the fetch
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page.
    getPosts(); // Calls the 'getPosts' function to fetch and update the list of blog posts
  }, []);

  return (
    <section className="px-4 container2 section dark:text-white text-black">
      <Slide delay={0.2}>
        <div className="mb-8">
          <Breadcrumb name={"blogs"} />
        </div>
        <h2 className="text-4xl font-bold">Blogs</h2>
      </Slide>
      {/* <p className="text-base mt-4 max-w-3xl text-[rgb(161,161,170)]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, nemo
        dolores. Blanditiis dolore facere officia esse velit, repellendus
        ducimus nostrum.
      </p> */}
      {posts?.length > 0 ? (
        <div className="mt-20 flex flex-col gap-4">
          {posts?.map((post) => (
            <Item post={post} key={post?._id} />
          ))}
        </div>
      ) : (
        <EmptyState value="Posts" />
      )}
    </section>
  );
};

export default BlogsPage;
