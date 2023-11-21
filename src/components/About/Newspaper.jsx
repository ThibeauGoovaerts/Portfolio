import React, { useState } from "react";
import PDFViewer from "../../utils/PDFViewer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Dialog } from "@headlessui/react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css"; // Import styles for react-pdf-viewer
import "@react-pdf-viewer/default-layout/lib/styles/index.css"; // Import styles for default layout
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { AiOutlineClose } from "react-icons/ai";

const Newspaper = ({ about }) => {
  // PDF file settings for about newspaper
  const [_file, id, extension] =
    about !== undefined && about?.newspaper !== undefined
      ? about?.newspaper.asset._ref.split("-")
      : "";
      
  let [isOpen, setIsOpen] = useState(false);

  const newplugin = defaultLayoutPlugin(); // Create a new instance of the defaultLayoutPlugin

  return (
    <div>
      <div className="mt-8">
        {/* Show the pdf from sanity.io on the screen */}

        <div>
          <PDFViewer
            pdf={`https://cdn.sanity.io/files/zk9p4t5n/production/${id}.${extension}`}
            plugin
          />
        </div>
      </div>
    </div>
  );
};

export default Newspaper;
