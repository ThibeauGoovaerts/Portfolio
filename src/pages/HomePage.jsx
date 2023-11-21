import React from "react";
import { About, Blog, Contact, Home, Projects } from "../components";

const HomePage = ({
  home,
  contact,
  posts,
  projects,
  catList,
  resumes,
  about,
  skills,
  achievements,
}) => {
  return (
    <main className="px-4">
      <Home home={home} />
      <About
        about={about}
        resumes={resumes}
        skills={skills}
        achievements={achievements}
      />
      <Projects projects={projects} catList={catList} />
      <Blog posts={posts} />
      <Contact contact={contact} />
    </main>
  );
};

export default HomePage;
