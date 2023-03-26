import React, { useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Filters from "./components/Filters";
import Capsules from "./components/Capsules";
import Pagination from "./components/Pagination";
import AppContext from "./AppContext";

function App() {
  // cards
  const [capsules, setCapsules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  // form/filter
  const [inputs, setInputs] = useState({
    type: "",
    status: "",
    landings: "",
  });

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [gridsToDisplay, setGridsToDisplay] = useState([]);

  return (
    <AppContext.Provider
      value={{
        capsules,
        setCapsules,
        isModalOpen,
        setIsModalOpen,
        modalIndex,
        setModalIndex,
        inputs,
        setInputs,
        currentPage,
        setCurrentPage,
        gridsToDisplay,
        setGridsToDisplay,
      }}
    >
      <div className="App">
        <Header />
        <Banner />
        <Filters />
        <Capsules />
        <Pagination />
      </div>
    </AppContext.Provider>
  );
}
export default App;
