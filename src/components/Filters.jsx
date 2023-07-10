import React, { useContext } from "react";
import AppContext from "../AppContext";
function Filters() {
  const { setInputs, inputs, setCapsules } = useContext(AppContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const apiUrl = "https://api.spacexdata.com/v3/capsules";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // used for the local server XAMPP
      /*
      const response = await fetch("http://localhost/PHP/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `type=${inputs.type}&status=${inputs.status}&landings=${inputs.landings}`,
      });
      */
      // used for the live server and deployed on netlify
      const response = await fetch(
        apiUrl +
          `?landings=${inputs.landings}&type=${inputs.type}&status=${inputs.status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setCapsules(responseData);
      } else {
        console.error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  };
  return (
    <article>
      <div className="container mx-auto max-w-7xl p-4 md:w-4/5">
        <h2 className="ml-20 text-3xl md:mx-auto">Search Filters</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-around">
            <div className="w-4/5 p-4 md:w-1/2 lg:w-1/4">
              <input
                className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="number"
                name="landings"
                id="landings"
                min={"0"}
                max={"3"}
                placeholder="Enter No. of Landings"
                value={inputs.landings}
                onChange={handleChange}
              />
            </div>
            <div className="left:20% w-4/5 p-4 md:w-1/2 lg:w-1/4">
              <select
                name="type"
                id="type"
                value={inputs.type}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="" defaultValue={""}>
                  Select Type
                </option>
                <option value="Dragon 1.0">Dragon 1.0</option>
                <option value="Dragon 1.1">Dragon 1.1</option>
                <option value="Dragon 2.0">Dragon 2.0</option>
              </select>
            </div>
            <div className="w-4/5 p-4 md:w-1/2 lg:w-1/4">
              <select
                name="status"
                id="status"
                value={inputs.status}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="" defaultValue={""}>
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="retired">Retired</option>
                <option value="destroyed">Destoyed</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div className="w-4/5 p-4 md:w-1/2 lg:w-1/4">
              <button
                type="submit"
                className="rounded-md bg-gray-900 px-4 py-2 font-semibold text-white shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </article>
  );
}

Filters.propTypes = {};

export default Filters;
