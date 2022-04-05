import React from "react";
import "./DisplayData.css";

export const DisplayData = (props) => {
  console.log(props.listOfData);
  console.log(props.filterData);
  return (
    <div className="mainContainer">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">ORDER ID</th>
            <th scope="col">CUSTOMER</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">PRODUCT</th>
            <th scope="col">
              {" "}
              Date Order
              <select onChange={(e) => props.changeOrder(e)}>
                <option value="">None</option>
                <option value="Earliest">Earliest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </th>
            <th scope="col">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {props.listOfData
            .filter((val) => {
              if (props.SearchedItem == "") {
                return val;
              } else if (
                val.customer
                  .toLowerCase()
                  .includes(props.SearchedItem.toLowerCase())
              ) {
                return val;
              }
            })
            .filter((val1) => {
              if (props.filterData === "None" || props.filterData === "") {
                return val1;
              } else if (val1.status === props.filterData) {
                return val1;
              }
            })
            .map((value, index) => {
              return (
                <tr key={index} className="tableRow">
                  <th scope="row">#{value.order_id}</th>
                  <td>{value.customer}</td>
                  <td>{value.address}</td>
                  <td>{value.product_title}</td>
                  <td>{value.date}</td>
                  <td className={`${value.status}`}>
                    <div className={`${value.status}-status`}>
                      {value.status}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
