import React, { useEffect, useState } from "react";
import Item from "./Item";
import "./projects.css";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Projects = ({ projects, catList }) => {
  const navigate = useNavigate();
  const [dataCount, setDataCount] = useState();
  const allProjectCount = projects?.length;

  const [projectItems, setProjectItems] = useState();

  // When the projects are loaded, we add the projects to setProjectItems
  useEffect(() => {
    setProjectItems(projects);
  }, [projects]);

  // This function works when you click on the categories in the Portfolio section. We filter portfolio items by category
  const filterItems = (category) => {
    if (category == "All") return setProjectItems(projects);

    const newProjectItems = projects?.filter(
      (item) => item.category[0].title === category
    );

    setProjectItems(newProjectItems);
  };

  useEffect(() => {
    // Group data by categories
    const groupedByCategory = projects?.reduce((acc, project) => {
      if (!acc[project.category[0].title]) {
        acc[project.category[0].title] = [];
      }
      acc[project.category[0].title].push(project);
      return acc;
    }, {});

    // Calculate the number of data for each category
    setDataCount(
      groupedByCategory !== undefined &&
        Object.keys(groupedByCategory).map((category) => {
          return {
            category: category,
            dataCount: groupedByCategory[category].length,
          };
        })
    );
  }, [projects]);

  return projects?.length > 0 ? (
    <section
      id="work"
      className="container2 section dark:text-white text-black"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-6xl max-md:text-4xl max-sm:text-3xl text-left">
          My Projecs
        </h2>
        <a
          href="/project"
          onClick={(e) => {
            e.preventDefault(); // To prevent page refresh
            navigate("/project"); // navigate /project page
            window.scrollTo(0, 0); // Scroll to the top of the page.
          }}
          className="flex px-8 items-center justify-center text-center gap-x-2 dark:bg-[rgba(39,39,43,.4)] bg-zinc-200 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-300 rounded-md py-2 text-base font-incognito font-semibold"
        >
          View all
        </a>
      </div>
      <div className="mt-20">
        {/* project filter component */}
        <Filter
          dataCount={dataCount}
          catList={catList}
          allProjectCount={allProjectCount}
          filterItems={filterItems}
        />

        <div className="mt-10 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-7">
          <AnimatePresence>
            {projectItems?.map((project) => (
              <Item project={project} key={project?._id} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  ) : (
    ""
  );
};

export default Projects;
