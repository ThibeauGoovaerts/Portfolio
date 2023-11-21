import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import ts from "refractor/lang/typescript";
import tsx from "refractor/lang/tsx";
import jsx from "refractor/lang/jsx";
import sql from "refractor/lang/sql";
import bash from "refractor/lang/bash";
import markdown from "refractor/lang/markdown";
import css from "refractor/lang/css";
import scss from "refractor/lang/scss";
import python from "refractor/lang/python";
import html from "refractor/lang/markup";
import yaml from "refractor/lang/yaml";
import graphql from "refractor/lang/graphql";
import json from "refractor/lang/json";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import "../styles/prism.css"; // Import CSS styles for syntax highlighting.

// Supported languages: https://prismjs.com/#supported-languages
Refractor.registerLanguage(js);
Refractor.registerLanguage(ts);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(sql);
Refractor.registerLanguage(bash);
Refractor.registerLanguage(markdown);
Refractor.registerLanguage(css);
Refractor.registerLanguage(scss);
Refractor.registerLanguage(python);
Refractor.registerLanguage(html);
Refractor.registerLanguage(yaml);
Refractor.registerLanguage(graphql);
Refractor.registerLanguage(json);

// Component for using code blocks on our website
const CodeBlock = ({ value }) => {
  return (
    <div className="my-6">
      <div className="flex items-center justify-between bg-zinc-50 dark:bg-[#141414] border dark:border-zinc-800 border-zinc-200 rounded-t-lg px-4 py-3 translate-y-2">
        <p className="text-sm">{value.filename || ""}</p>
        <div className="flex items-center gap-3">
          <p className="text-sm">{value.language || ""}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(value.code); // Copy the code to the clipboard.
              toast.dark("Copied to Clipboard", {
                progressStyle: { backgroundColor: "#27b173" }, // Show a toast notification.
              });
            }}
          >
            <BiCopy /> {/* Render a copy icon for copying the code. */}
          </button>
        </div>
      </div>
      <Refractor
        language={value.language ? value.language : "jsx"}
        value={value.code}
        className="text-sm border-x border-b p-5 dark:border-zinc-800 border-zinc-200 rounded-b-lg tracking-normal"
      />
    </div>
  );
};

export default CodeBlock;
