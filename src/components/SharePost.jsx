import React from "react";
import {
  BiLogoTwitter,
  BiLogoLinkedinSquare,
  BiLogoFacebookSquare,
  BiLogoWhatsapp,
} from "react-icons/bi";

const SharePost = ({ title, slug, description }) => {
  // Define the base URL for your blog.
  const blog = encodeURIComponent("https://tgoovaerts.be/blog/");

  // Create an array of social media sharing options, each with an icon, name, and share URL.
  const options = [
    {
      icon: BiLogoTwitter,
      name: "Twitter",
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}%0A%0A${blog}${slug}`,
    },
    {
      icon: BiLogoLinkedinSquare,
      name: "LinkedIn",
      shareUrl: `https://linkedin.com/sharing/share-offsite/?url=${blog}${slug}&title=${title}&summary=${description}`,
    },
    {
      icon: BiLogoFacebookSquare,
      name: "Facebook",
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${blog}${slug}`,
    },
    {
      icon: BiLogoWhatsapp,
      name: "WhatsApp",
      shareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "Read this amazing article by Thibeau Goovaerts"
      )}.%0A%0A${title}%0A%0A${blog}${slug}`,
    },
  ];

  // Function to open a sharing popup for the given URL.
  const openPopup = (url) => {
    window.open(
      url,
      "Social Share",
      "width=600,height=600,resizable=yes,scrollbars=yes,status=yes"
    );
  };

  return (
    <section className="border-b dark:border-zinc-800 border-zinc-300 pb-10">
      <h3 className="text-xl font-semibold tracking-tight mb-4">Share Post</h3>

      <div className="flex flex-wrap items-center gap-2 tracking-tight">
        {options.map((data, id) => (
          <a
            key={id}
            onClick={() => openPopup(data.shareUrl)}
            title={`Share to ${data.name}`}
            aria-label={`Share to ${data.name}`}
            className="cursor-pointer w-12 h-12 p-2 grid place-content-center text-2xl border dark:border-zinc-800 border-zinc-300 rounded-md"
          >
            <data.icon aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default SharePost;
