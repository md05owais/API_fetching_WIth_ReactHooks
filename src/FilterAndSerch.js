import React from "react";

const FilterAndSerch = (props) => {
  return (
    <div>
      {props.listOfData.map((val) => {
        if (val === "Delivered") {
          val.style = { color: "green" };
        }
      })}
    </div>
  );
};

export default FilterAndSerch;
