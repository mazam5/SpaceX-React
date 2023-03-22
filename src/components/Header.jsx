import React from "react";

export default function Header() {
  return (
    <div>
      <div className="container w-full border-b-2">
        <nav className="py-2 md:py-4">
          <div className=" mx-auto max-w-7xl rounded-lg px-2 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <a href="http:" className="text-lg font-bold">
                  SpaceX
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
