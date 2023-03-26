import React, { useState, useCallback, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Filters from "./components/Filters";
import Capsules from "./components/Capsules";
import Pagination from "./components/Pagination";

function App() {
  // cards
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });
  const [capsules, setCapsules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/php/");
        const data = await response.json();
        setCapsules(data);
        setState({ loading: false, data: gridsPerPage, error: null });
      } catch (error) {
        setState({ loading: false, data: null, error: error.message });
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = (index) => {
    setIsModalOpen(!isModalOpen);
    if (index !== undefined) {
      setModalIndex(index);
    }
  };
  // form/filter
  const [inputs, setInputs] = useState({
    type: "",
    status: "",
    landings: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  useEffect(() => {
    console.log(inputs);
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/php/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `type=${inputs.type}&status=${inputs.status}&landings=${inputs.landings}`,
      });
      console.log(
        `type=${inputs.type}&status=${inputs.status}&landings=${inputs.landings}`
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

  // pagination
  const itemsPerPage = 10;
  const gridsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [gridsToDisplay, setGridsToDisplay] = useState([]);

  const indexOfLastGrid = currentPage * gridsPerPage;
  const indexOfFirstGrid = indexOfLastGrid - gridsPerPage;

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
      isCurrentPage ? "z-10 bg-gray-900 text-white" : "text-gray-900"
    } inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus:z-20`;

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

  useEffect(() => {
    setGridsToDisplay(capsules.slice(indexOfFirstGrid, indexOfLastGrid));
  }, [capsules, indexOfFirstGrid, indexOfLastGrid]);

  const renderPageButtons = useCallback(
    () => pages.map(renderPageButton),
    [pages, renderPageButton]
  );

  return (
    <div className="App">
      <Header />
      <Banner />
      <Filters
        inputs={inputs}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <Capsules
        gridsToDisplay={gridsToDisplay}
        toggleModal={toggleModal}
        modalIndex={modalIndex}
        isModalOpen={isModalOpen}
        state={state}
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
