import React, { useState } from "react";

function Filters(props) {
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();

  const handleChange1 = (event) => {
    setValue1(event.target.value);
    console.log(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
    console.log(event.target.value);
  };
  const handleChange3 = (event) => {
    setValue3(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <div className="container mx-auto max-w-7xl p-4 md:w-4/5">
        <h2 className="ml-20 text-3xl md:mx-auto">Search Form</h2>
        <div className="flex flex-wrap justify-around">
          <div className="left:20% w-4/5 p-4 md:w-1/2 lg:w-1/4">
            <select
              value={value1}
              onChange={handleChange1}
              className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="Dragon 1.0">Dragon 1.0</option>
              <option value="Dragon 1.1">Dragon 1.1</option>
              <option value="Dragon 2.0">Dragon 2.0</option>
            </select>
          </div>
          <div className="w-4/5 p-4 md:w-1/2 lg:w-1/4">
            <select
              value={value2}
              onChange={handleChange2}
              className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option defaultValue="">Select Status</option>
              <option value="active">Active</option>
              <option value="retired">Retired</option>
              <option value="destroyed">Destoyed</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="w-4/5 p-4 md:w-1/2 lg:w-1/4">
            <input
              value={value3}
              onChange={handleChange3}
              type="date"
              className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-4/5 p-4 md:w-1/2 lg:w-1/4">
            {" "}
            <button className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Filters.propTypes = {};

export default Filters;
