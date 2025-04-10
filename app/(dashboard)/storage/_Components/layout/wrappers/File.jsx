import React from "react";
import Folder from "../templates/Folder";
import Image from "../templates/Image";
import Video from "../templates/Video";

const File = ({ type, src , ext }) => {
  if (type === "image") {
    return <Image src={src}   />;
  } else if (type === "video") {
    return <Video src={src}   />;
  } else if (type === "folder") {
    return <Folder src="/folder.png"   />;
  } else {
    if (ext == "pdf") {
      return <img src="/pdf.png" alt="pdf" />;
    } else if (ext == "csv") {
      return <img src="/csv-file.png" alt="csv" />;
    } else if (ext == "docx") {
      return <img src="/docx-file.png" alt="docx" />;
    } else if (ext == "ppt") {
      return <img src="/ppt.png" alt="ppt" />;
    } else if (ext == "pptx") {
      return <img src="/pptx.png" alt="pptx" />;
    } else if (ext == "xlsx") {
      return <img src="/xls-file.png" alt="xlsx" />;
    } else {
      return <img src="/file.png" alt="pdf" />;
    }
  }
};

export default File;
