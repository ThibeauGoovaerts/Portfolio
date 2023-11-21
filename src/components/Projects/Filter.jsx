import React, { useState } from "react";
import { Slide } from "../../animation/Slide";

// project filter component
const Filter = ({ dataCount, catList, allProjectCount, filterItems }) => {
  const [active, setActive] = useState(0);

  return (
    <Slide delay={0.2}>
      <ul className="flex gap-6 flex-wrap">
        <li>Filter by:</li>
        {catList?.map((cat, i) => {
          return (
            <li key={i}>
              <button
                className={`cursor-pointer relative ${
                  active === i ? "active" : ""
                }`}
                type="button"
                aria-label="Project Category"
                onClick={() => {
                  setActive(i);
                  filterItems(cat);
                }}
              >
                <span className="font-bold">{cat}</span>
                <span className="absolute -top-[5px] -right-[15px] text-[.7em] text-left">
                  {/* print all categories name and their count */}

                  {cat === "All"
                    ? allProjectCount
                    : dataCount &&
                      dataCount?.map(
                        (item) => item.category === cat && item.dataCount
                      )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Slide>
  );
};

export default Filter;
