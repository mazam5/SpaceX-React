import React from "react";

export default function Capsules(props) {
  const { gridsToDisplay, isModalOpen, modalIndex, toggleModal, state } = props;
  if (state.loading) {
    return (
      <div className="my-20">
        <p className="mx-auto w-4/5 text-center">Loading Please Wait... 😊</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="my-20">
        <p className="mx-auto w-4/5 text-center">{state.error} 😔</p>
      </div>
    );
  }

  if (!gridsToDisplay || gridsToDisplay.length === 0) {
    return (
      <div className="my-20">
        <p className="mx-auto w-4/5 text-center">Data Not Found 😔</p>
      </div>
    );
  }
  return (
    <section>
      <div className="container mx-auto w-4/5 lg:w-4/5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {gridsToDisplay.map((item, index) => (
            <article key={index} className="rounded-lg bg-gray-200 p-4">
              <h2>Serial: {item.capsule_serial}</h2>
              <p>Type: {item.type}</p>
              <p>Status: {item.status}</p>
              {item.original_launch ? (
                <p>
                  Original Launch:{" "}
                  {new Date(item.original_launch).getFullYear()}-{""}
                  {new Date(item.original_launch).getMonth() + 1}-{""}
                  {new Date(item.original_launch).getDate()}
                </p>
              ) : null}
              <p>Landings: {item.landings}</p>
              <p>Reuse Count: {item.reuse_count}</p>
              <button
                className="mt-4 w-full rounded bg-gray-900 py-2 px-4 font-bold text-white hover:bg-gray-700"
                onClick={() => toggleModal(index)}
              >
                Show Details
              </button>
              {isModalOpen && modalIndex === index && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-screen items-center justify-center bg-black bg-opacity-60">
                    <div className="relative w-1/2 rounded-lg bg-white">
                      <div className="absolute top-0 right-0 p-8">
                        <button
                          className="rounded bg-gray-900 py-2 px-4 font-bold text-white hover:bg-gray-700"
                          onClick={toggleModal}
                        >
                          Close
                        </button>
                      </div>
                      <div className="p-4">
                        <h2>Serial: {item.capsule_serial}</h2>
                        <p>ID: {item.capsule_id}</p>
                        <p>Status: {item.status}</p>
                        <p>Type: {item.type}</p>
                        <p>Original Launch: {item.original_launch}</p>
                        <p>Missions:</p>
                        <ul>
                          {item.missions.map((mission) => (
                            <li className="ml-4" key={mission.flight}>
                              Name: {mission.name}, Flight: {mission.flight}
                            </li>
                          ))}
                        </ul>
                        <p>Launch Unix: {item.original_launch_unix}</p>
                        <p>Landings: {item.landings}</p>
                        <p>Details: {item.details}</p>
                        <p>Reuse Count: {item.reuse_count}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
