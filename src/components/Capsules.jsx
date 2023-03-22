import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Capsules() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [gridsToDisplay, setGridsToDisplay] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [capsules, setCapsules] = useState([]);

  const gridsPerPage = 10;
  const indexOfLastGrid = currentPage * gridsPerPage;
  const indexOfFirstGrid = indexOfLastGrid - gridsPerPage;

  const fetchCapsules = useCallback(async () => {
    try {
      const res = await fetch("https://api.spacexdata.com/v3/capsules").then(
        (response) => response.json().then((data) => setCapsules(data))
      );
      const data = await res.json();
      setCapsules(data);
    } catch (error) {
      // console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCapsules();
  }, [fetchCapsules]);

  useEffect(() => {
    setGridsToDisplay(capsules.slice(indexOfFirstGrid, indexOfLastGrid));
  }, [capsules, indexOfFirstGrid, indexOfLastGrid]);
  const handleNextPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);
  const pageButtonClass = (isCurrentPage) =>
    `relative ${
      isCurrentPage ? "z-10 bg-indigo-600 text-white" : "text-gray-900"
    } inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20`;
  const renderPageButton = useCallback(
    (page) => {
      const isCurrentPage = page === currentPage;
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={pageButtonClass(isCurrentPage)}
        >
          {page}
        </button>
      );
    },
    [currentPage]
  );

  const pages = Array.from(
    { length: Math.ceil(capsules.length / itemsPerPage) },
    (_, i) => i + 1
  );
  const renderPageButtons = useCallback(
    () => pages.map(renderPageButton),
    [pages, renderPageButton]
  );
  const toggleModal = (index) => {
    setIsModalOpen(!isModalOpen);
    if (index !== undefined) {
      setModalIndex(index);
    }
  };

  // object for Filters
  const [selectedValue1, setSelectedValue1] = useState();
  const [selectedValue2, setSelectedValue2] = useState();
  const [selectedValue3, setSelectedValue3] = useState();
  const handleChange1 = (event) => {
    setSelectedValue1(event.target.value);
    const val1 = event.target.value;
    console.log(val1);
  };
  const handleChange2 = (event) => {
    setSelectedValue2(event.target.value);
    const val2 = event.target.value;
    console.log(val2);
  };
  const handleChange3 = (event) => {
    setSelectedValue3(event.target.value);
    const val3 = event.target.value;
    console.log(val3);
  };
  // adding filtering objects
  // const filteredGrids = gridsToDisplay.filter((item) => val2 === item.type);
  return (
    <div>
      <div className="container mx-auto max-w-7xl p-4 md:w-4/5">
        <h2 className="ml-20 text-3xl md:mx-auto">Search Form</h2>
        <div className="flex flex-wrap justify-around">
          <div className="left:20% w-4/5 p-4 md:w-1/2 lg:w-1/4">
            <select
              value={selectedValue1}
              onChange={handleChange1}
              className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option defaultValue="">Select Type</option>
              <option value="Dragon 1.0">Dragon 1.0</option>
              <option value="Dragon 1.1">Dragon 1.1</option>
              <option value="Dragon 2.0">Dragon 2.0</option>
            </select>
          </div>
          <div className="w-4/5 p-4 md:w-1/2 lg:w-1/4">
            <select
              value={selectedValue2}
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
              defaultValue={Date.UTC(2023)}
              value={selectedValue3}
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
      <div className="container mx-auto w-4/5 py-5 lg:w-4/5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* var ids = */}
          {gridsToDisplay.map((item, index) => (
            <div key={index} className="rounded-lg bg-gray-200 p-4">
              <div>Serial: {item.capsule_serial}</div>
              <div>ID: {item.capsule_id}</div>
              <div>Status: {item.status}</div>
              <div>Original Launch: {item.original_launch}</div>
              <div>Type: {item.type}</div>
              <button
                className="mt-4 w-full rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={() => toggleModal(index)}
              >
                Show Details
              </button>
              {isModalOpen && modalIndex === index && (
                <div className="fixed inset-0 z-10 overflow-y-auto bg-black">
                  <div className="flex min-h-screen items-center justify-center">
                    <div className="relative w-1/2 rounded-lg bg-white">
                      <div className="absolute top-0 right-0 p-8">
                        <button
                          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-gray-700"
                          onClick={toggleModal}
                        >
                          Close
                        </button>
                      </div>
                      <div className="p-4">
                        <div>Serial: {item.capsule_serial}</div>
                        <div>ID: {item.capsule_id}</div>
                        <div>Status: {item.status}</div>
                        <div>Original Launch: {item.original_launch}</div>
                        <div>Type: {item.type}</div>
                        <div>Missions:</div>
                        <ul>
                          {item.missions.map((mission) => (
                            <li key={mission.flight}>
                              Name: {mission.name}, Flight: {mission.flight}
                            </li>
                          ))}
                        </ul>
                        <div>Launch Unix: {item.original_launch_unix}</div>
                        <div>Landings: {item.landings}</div>
                        <div>Details: {item.details}</div>
                        <div>Reuse Count: {item.reuse_count}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrevPage}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ${
                currentPage === 1 ? "ring-gray-300" : "ring-indigo-600"
              } hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {renderPageButtons()}
            <button
              onClick={handleNextPage}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ${
                currentPage === pages.length
                  ? "ring-gray-300"
                  : "ring-indigo-600"
              } hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              disabled={currentPage === pages.length}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
