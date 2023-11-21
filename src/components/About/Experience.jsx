import React, { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { IoIosArrowUp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { BiLinkExternal } from "react-icons/bi";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../sanity";
import { PortableText } from "@portabletext/react";
import { components } from "../../utils/PortableTextOptions";
import moment from "moment";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const Experience = ({ experience }) => {
  return (
    // collapsible item
    <Disclosure as="div" className="mt-4 [&>*:last-child]:mb-2">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex max-sm:flex-col items-center gap-2 w-full mt-10 justify-between rounded-md shadow-[#27b173_0px_0px_3px] px-6 py-5 text-left max-sm:text-sm font-medium dark:text-white text-black focus:outline-none ${
              open ? "bg-[#27b17359]" : "bg-transparent"
            }`}
          >
            <div className="flex justify-between items-center w-full max-sm:flex-col gap-2">
              <div className="max-w-sm">{experience?.title}</div>
              <div className="text-sm text-zinc-700 dark:text-zinc-200">
                {moment(experience?.startDate).format("YYYY MMM")} - {""}
                {experience?.endDate
                  ? moment(experience?.endDate).format("YYYY MMM")
                  : "Present"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IoIosArrowUp
                className={`${
                  !open ? "rotate-180 transform" : ""
                } h-5 w-5 text-white-500 transition-all`}
              />
            </div>
          </Disclosure.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="px-6 pt-5 mt-4 rounded-md max-sm:text-sm bg-[#3fa07448] pb-5 text-gray">
              <div className="flex gap-2 items-center max-md:items-start max-md:flex-col-reverse">
                <div className="flex-1">
                  {experience?.location !== undefined ? (
                    <h4 className="mb-3">{experience?.subtitle}</h4>
                  ) : (
                    ""
                  )}

                  {experience?.location !== undefined ? (
                    <div className="flex items-center gap-1 mb-3">
                      <FaLocationDot className="text-base" />
                      <h4>{experience?.location}</h4>
                    </div>
                  ) : (
                    ""
                  )}
                  {experience?.link !== undefined ? (
                    <div className="flex items-center gap-2">
                      <BiLinkExternal className="text-base" />
                      <a
                        href={experience?.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex flex-1 items-center gap-x-2 transition-all duration-150 ease-in hover:text-[#27b173]"
                      >
                        {experience?.link}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  {experience?.description !== undefined ? (
                    <div className="mt-2">
                      <PortableText
                        value={experience?.description}
                        components={components}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {experience?.image !== undefined ? (
                  <div className="mb-4 max-md:w-full">
                    <img
                      src={urlFor(experience?.image.asset._ref)}
                      alt=""
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Experience;
