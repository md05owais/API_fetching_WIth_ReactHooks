import React, { useEffect, useState } from "react";
import axios from "axios";
import { DisplayData } from "./DisplayData";
// import FilterAndSerch from "./FilterAndSerch";
import "./DisplayData.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [date, setDate] = useState([]);

  //by using fetch and useeffect..........
  // useEffect(() => {
  //   fetch("https://my-json-server.typicode.com/Ved-X/assignment/orders")
  //     .then((responce) => responce.json())
  //     .then((result) => {
  //       console.log(result);
  //       setData(result);
  //     });
  // }, []);

  // filterWithStatus

  // const filterWithStatus = (e) => {
  //   console.log(e.target.value);
  // };
  // by using Async await and axios

  const fetchData = async () => {
    const result = await axios(
      "https://my-json-server.typicode.com/Ved-X/assignment/orders"
    );
    console.log(result);
    // const data = await value.json();
    // console.log(data);
    setData(result.data);
    setDate(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // date sorting

  const changeOrder = (e) => {
    console.log(e.target.value);

    const newData = data.map((val) => {
      const newArray = val.date.split("/");
      const dataArray = newArray.reverse();
      const finalValueOfString = +dataArray.join("");
      return finalValueOfString;
    });
    const sortedValue = newData.sort();
    const sortedDate = sortedValue.map((val) => {
      const newDateArray = [Math.trunc(val / 10000).toString()];
      val = val - Math.trunc(val / 10000) * 10000;
      let MM = Math.trunc(val / 100);
      if (MM < 10) {
        MM = "0" + MM;
      }
      newDateArray.push(MM.toString());
      let day = val - Math.trunc(val / 100) * 100;
      if (day < 10) {
        day = "0" + day;
      }
      newDateArray.push(day.toString());
      newDateArray.reverse();

      const newDate = newDateArray.join("/");
      return newDate;
    });
    console.log(sortedDate);
    const actualArrayForSortedDate = [];
    const dateAnswer = sortedDate.filter((val) => {
      for (let i = 0; i < data.length; i++) {
        if (val === data[i].date) {
          console.log(data[i]);
          actualArrayForSortedDate.push(data[i]);
        }
      }
    });
    // console.log(dateAnswer);
    console.log(actualArrayForSortedDate);
    if (e.target.value === "Oldest") {
      setData(actualArrayForSortedDate);
    } else if (e.target.value === "Earliest") {
      setData(actualArrayForSortedDate.reverse());
    } else {
      setData(data);
    }
  };

  return (
    <div>
      <div className="upperDiv">All Orders {data.length}</div>

      <hr />
      <div
        className="ui left icon input searchBox"
        style={{ boxShadow: "2px 2px 1px 6px rgba(225,223,223,0.86)" }}
      >
        <input
          type="text"
          placeholder="Search..."
          className="SearchBox"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="search icon"></i>
      </div>
      <span className="filterData">
        <i className="sort amount down icon"> Filter</i>
        <select
          className="selection"
          onChange={(e) => setFilterData(e.target.value)}
        >
          <option defaultValue>None</option>
          <option>Delivered</option>
          <option>Completed</option>
          <option>Prepared</option>
          <option>Prepone</option>
        </select>
      </span>

      {data && (
        <DisplayData
          listOfData={data}
          SearchedItem={search}
          filterData={filterData}
          changeOrder={changeOrder}
        />
      )}
    </div>
  );
};

export default Home;
