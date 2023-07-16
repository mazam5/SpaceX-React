import React from "react";

export default function Header() {
  return (
    <header>
      <nav className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="h-8 w-16 text-2xl text-white">SpaceX</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="http:"
                    className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                  >
                    Capsules
                  </a>
                  <a
                    href="http:"
                    disabled
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Rockets
                  </a>
                  <a
                    href="http:"
                    disabled
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Launches
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
