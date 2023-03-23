import React from "react";

export default function Capsules(props) {
  const { gridsToDisplay, isModalOpen, modalIndex, toggleModal } = props;
  return (
    <div>
      <div className="container mx-auto w-4/5 lg:w-4/5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
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
                <div className="z-1 fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-screen items-center justify-center bg-black bg-opacity-60">
                    <div className="relative w-1/2 rounded-lg bg-white">
                      <div className="absolute top-0 right-0 p-8">
                        <button
                          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
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
    </div>
  );
}
