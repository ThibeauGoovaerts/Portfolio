import React, { useEffect, useState } from "react";
import "./App.css"; // Importing the CSS styles
import gsap from "gsap"; // Importing GSAP for animations
import { ToastContainer } from "react-toastify"; // Importing a toast notification component
import "react-toastify/dist/ReactToastify.css"; // Importing styles for the toast component
import { Footer, Header } from "./components";
import {
  BlogDetailsPage,
  BlogsPage,
  HomePage,
  PhotosPage,
  ProjectDetailsPage,
  ProjectsPage,
} from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";
import CustomCursor from "./utils/CustomCursor";
import SanityService from "./services/sanityService"; // Importing a custom service
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";

const getStorageTheme = () => {
  let theme = "dark";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

const App = () => {
  const [theme, setTheme] = useState(getStorageTheme());

  // setting to remove gsap null target warn
  gsap.config({
    nullTargetWarn: false,
  });

  const [home, setHome] = useState(); // State for home data
  const [about, setAbout] = useState(); // State for about data
  const [projects, setProjects] = useState(); // State for project data
  const [posts, setPosts] = useState(); // State for blog posts data
  const [catList, setCatList] = useState(); // State for project categories list
  const [resumes, setResumes] = useState(); // State for resumes data
  const [contact, setContact] = useState(); // State for contact data
  const [photos, setPhotos] = useState(); // State for photos data
  const [skills, setSkills] = useState(); // State for skills data
  const [achievements, setAchievements] = useState(); // State for achievements data

  /* GET HOME DATA FROM SANITY SERVICE */
  const getHome = () => {
    SanityService.getData("home")
      .then((response) => {
        setHome(response[response.length - 1]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET ABOUT DATA FROM SANITY SERVICE */
  const getAbout = () => {
    SanityService.getData("about")
      .then((response) => {
        setAbout(response[response.length - 1]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET CONTACT DATA FROM SANITY SERVICE */
  const getContact = () => {
    SanityService.getData("contact")
      .then((response) => {
        setContact(response[response.length - 1]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET PORTRFOLIO DATA FROM SANITY SERVICE */
  const getProjects = () => {
    SanityService.getDataWithCategory("project", 6)
      .then((response) => {
        setProjects(response);
        // We put the project category into an array
        const allCatList = [
          "All",
          ...new Set(response?.map((project) => project.category[0].title)),
        ];
        setCatList(allCatList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET RESUMES DATA FROM SANITY SERVICE */
  const getResumes = () => {
    SanityService.getData("resume")
      .then((response) => {
        setResumes(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET Achievements DATA FROM SANITY SERVICE */
  const getAchievements = () => {
    SanityService.getData("achievement")
      .then((response) => {
        setAchievements(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET SKILLS DATA FROM SANITY SERVICE */
  const getSkills = () => {
    SanityService.getData("skill")
      .then((response) => {
        setSkills(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET BLOG POSTS DATA FROM SANITY SERVICE */
  const getPosts = () => {
    SanityService.getDataWithAuthor("post", 4)
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* GET PHOTOS DATA FROM SANITY SERVICE */
  const getPhotos = () => {
    SanityService.getData("photo")
      .then((response) => {
        setPhotos(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getHome();
    getContact();
    getProjects();
    getResumes();
    getPosts();
    getAbout();
    getSkills();
    getPhotos();
    getAchievements();
  }, []);

  return (
    <div className="dark:bg-primary-bg bg-secondary-bg app min-h-screen">
      <Header theme={theme} setTheme={setTheme} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                home={home}
                contact={contact}
                posts={posts}
                projects={projects}
                catList={catList}
                resumes={resumes}
                about={about}
                photos={photos}
                skills={skills}
                achievements={achievements}
              />
            }
          />
          <Route path="/photos" element={<PhotosPage photos={photos} />} />
          <Route path="/project" element={<ProjectsPage />} />
          <Route path="/project/:slug" element={<ProjectDetailsPage />} />
          <Route path="/blog" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          {/* default redirect to home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>

      <Footer />

      {/* scroll to top */}
      <ScrollToTop />

      {/* custom cursor */}
      <CustomCursor />

      {/* ToastContainer */}
      <ToastContainer />
    </div>
  );
};

export default App;
