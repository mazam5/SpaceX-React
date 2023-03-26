import React from "react";

export default function Banner() {
  return (
    <main className="border-b-2">
      <div className="container mx-auto w-4/5">
        <div className="flex flex-col items-center sm:py-5 md:flex-row md:py-4">
          <div className="w-full text-center md:w-1/2 md:text-left">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <h2 className="my-6 text-2xl md:text-5xl">
                Capsules that reached Mars.
              </h2>
              <p className="my-6 text-lg">Welcome to our website!</p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/23781/pexels-photo.jpg"
              alt="Capsule"
              className="h-auto w-full max-w-sm sm:mx-auto md:max-w-none"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
