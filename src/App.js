import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Filters from "./components/Filters";
import Capsules from "./components/Capsules";
import Pagination from "./components/Pagination";

function App() {
  const [capsules, setCapsules] = useState([]);

  const fetchCapsules = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.spacexdata.com/v3/capsules"
      );
      setCapsules(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCapsules();
  }, [fetchCapsules]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [gridsToDisplay, setGridsToDisplay] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  const gridsPerPage = 10;
  const indexOfLastGrid = currentPage * gridsPerPage;
  const indexOfFirstGrid = indexOfLastGrid - gridsPerPage;

  useEffect(() => {
    setGridsToDisplay(capsules.slice(indexOfFirstGrid, indexOfLastGrid));
  }, [capsules, indexOfFirstGrid, indexOfLastGrid]);
  //
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
  return (
    <div className="App">
      <Header />
      <Banner />
      <Filters />
      <Capsules
        gridsToDisplay={gridsToDisplay}
        toggleModal={toggleModal}
        modalIndex={modalIndex}
        isModalOpen={isModalOpen}
      />
      <Pagination
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        renderPageButtons={renderPageButtons}
        pages={pages}
      />
    </div>
  );
}
export default App;
