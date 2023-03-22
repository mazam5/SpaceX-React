import React from "react";

export default function Banner() {
  return (
    <div className="border-b-2 p-3">
      <div className="container mx-auto w-4/5">
        <div className="flex flex-wrap items-center py-2 md:py-4">
          <div className="w-full md:w-1/2">
            <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
              <h2 className="relative my-12 w-4/5 text-5xl">
                Powerful Tagline for your Product
              </h2>
              <p className="my-6 text-lg">Welcome to our website!</p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/23781/pexels-photo.jpg"
              alt=""
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
