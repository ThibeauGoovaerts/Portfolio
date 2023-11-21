import React from "react";
import duckImage from "../assets/searching-duck.gif";
import { Slide } from "../animation/Slide";

const EmptyState = ({ value }) => {
  return (
    <Slide delay={0.2}>
      <div className="w-full mt-10 flex flex-col items-center text-center dark:bg-primary-bg bg-zinc-100 border border-dashed dark:border-zinc-700 border-zinc-300 rounded-md px-6 py-8">
        <div className="mb-6 text-4xl text-zinc-500">
          <img
            width={80}
            height={80}
            src={duckImage}
            alt="Yellow duck searching"
          />
        </div>
        <h3 className="font-bold tracking-tight text-xl mb-3">
          No {value} Found
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 ml-4 max-w-xs">
          There are no {value.toLowerCase()} available at this time. Check back
          again.
        </p>
      </div>
    </Slide>
  );
};

export default EmptyState;
