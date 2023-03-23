import React from "react";
// import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
function Pagination(props) {
  const {
    handlePrevPage,
    handleNextPage,
    currentPage,
    renderPageButtons,
    pages,
  } = props;
  return (
    <div>
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

Pagination.propTypes = {};

export default Pagination;
