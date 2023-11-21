import imageUrlBuilder from "@sanity/image-url";
import getVideoId from "get-video-id";
import YouTube from "react-youtube";
import sanityClient from "../../sanity";
import CodeBlock from "./CodeBlock";
import { HiExternalLink } from "react-icons/hi";
import { BiSolidQuoteRight } from "react-icons/bi";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const opts = {
  height: "450",
  width: "100%",
};

// Barebones lazy-loaded image component
const SampleImageComponent = (props) => {
  return (
    <img
      src={urlFor()
        .image(props.value.asset._ref)
        .fit("max")
        .auto("format")
        .url()}
      className="w-[50%] h-[50%] mx-auto rounded-md"
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: props.isInline ? "inline-block" : "block",

        // Avoid jumping around with aspect-ratio CSS property
      }}
    />
  );
};

// PortableText package options
export const components = {
  types: {
    image: SampleImageComponent,
    youtube: (props) => {
      const { url } = props.value;
      const id = getVideoId(url);
      return <YouTube videoId={id.id} opts={opts} />;
    },
    break: (props) => {
      const { style } = props.value;
      if (style === "lineBreak") {
        return <hr className="lineBreak" />;
      }
      if (style === "lineSpacing") {
        return <br className="lineSpacing" />;
      }
      return null;
    },
    button: (props) => {
      return (
        <div>
          <a
            href={props.value.link}
            target="_blank"
            rel="noreferrer noopener"
            className="flex w-fit px-8 items-center justify-center text-center gap-x-2 dark:bg-[rgba(39,39,43,.4)] bg-zinc-200 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-300 rounded-md py-2 text-base font-incognito font-semibold"
          >
            {props.value.name}
          </a>
        </div>
      );
    },
    code: (props) => {
      return (
        <code className="font-incognito py-[0.15rem] px-1 rounded-sm font-medium">
          <CodeBlock value={props.value} />
        </code>
      );
    },
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: ({ children }) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),

    // Ex. 2: rendering a custom `link` annotation
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          className="hover:underline link text-blue-400 inline-flex"
          rel={target === "_blank" && "noindex nofollow"}
        >
          {children}
          <HiExternalLink />
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-extrabold">{children}</strong>,
  },
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="text-5xl dark:text-white text-black">{children}</h1>,
    blockquote: ({ children }) => (
      <blockquote className="relative overflow-hidden tracking-tight text-lg lg:py-6 lg:pl-6 pr-12 p-4 border dark:border-zinc-800 border-zinc-200 rounded-md">
        <BiSolidQuoteRight
          className="text-7xl absolute -top-7 -right-5 -rotate-12 dark:text-zinc-800 text-zinc-300"
          aria-hidden="true"
        />
        {children}
      </blockquote>
    ),
    h2: ({ children }) => <h2 className="text-4xl dark:dark:text-white text-black ">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl dark:text-white text-black">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl dark:text-white text-black">{children}</h4>,
    p: ({ children }) => console.log(children),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="mt-xl list-inside flex flex-col gap-3">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-lg list-decimal list-inside flex flex-col gap-3">
        {children}
      </ol>
    ),

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <li style={{ listStyleType: "disc" }}>{children}</li>
    ),

    // Ex. 2: rendering custom list items
    checkmarks: ({ children }) => <li>✅ {children}</li>,
  },
};
