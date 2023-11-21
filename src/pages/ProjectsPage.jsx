import React, { useEffect } from "react";
import Item from "../components/Projects/Item";
import Filter from "../components/Projects/Filter";
import Breadcrumb from "../utils/Breadcrumb";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SanityService from "../services/sanityService";
import EmptyState from "../components/EmptyState";
import { Slide } from "../animation/Slide";

const ProjectsPage = () => {
  const [projects, setProjects] = useState();
  const [catList, setCatList] = useState(); // State to store the project category list

  /* GET PORTRFOLIO DATA FROM SANITY SERVICE */
  const getProjects = () => {
    SanityService.getDataWithCategory("project") // Fetches project data with categories
      .then((response) => {
        setProjects(response);
        // Create an array of unique project categories and include 'All' as an option
        const allCatList = [
          "All",
          ...new Set(response?.map((project) => project.category[0].title)),
        ];
        setCatList(allCatList); // Updates the 'catList' state with the category list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page.
    getProjects();
  }, []);

  const [dataCount, setDataCount] = useState(); // State to store the data count for each category
  const allProjectCount = projects?.length; // Total count of all projects

  const [projectItems, setProjectItems] = useState(); // State to store the filtered project items

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
    // Group data by category
    const groupedByCategory = projects?.reduce((acc, project) => {
      if (!acc[project.category[0].title]) {
        acc[project.category[0].title] = [];
      }
      acc[project.category[0].title].push(project);
      return acc;
    }, {});

    // Calculate data count for each category
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

  return (
    <section className="px-4 container2 section dark:text-white text-black">
      <Slide delay={0.2}>
        <div className="mb-8">
          <Breadcrumb name={"projects"} />
        </div>
        <h2 className="text-4xl font-bold mb-6">Projects</h2>
      </Slide>
      {/* <p className="text-base mt-6 mb-6 max-w-3xl text-[rgb(161,161,170)]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, nemo
        dolores. Blanditiis dolore facere officia esse velit, repellendus
        ducimus nostrum.
      </p> */}

      {/* project filter component */}
      {projects?.length > 0 ? (
        <>
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
        </>
      ) : (
        <EmptyState value="Projects" />
      )}
    </section>
  );
};

export default ProjectsPage;
