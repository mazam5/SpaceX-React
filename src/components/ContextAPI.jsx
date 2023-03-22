import React, { createContext, useContext } from "react";

const DataContext = createContext();

function ParentComponent() {
  const dataValue = "Hello World";

  return (
    <DataContext.Provider value={dataValue}>
      <ChildComponent />
    </DataContext.Provider>
  );
}

function ChildComponent() {
  const data = useContext(DataContext);

  return <div>{data}</div>;
}

export default ParentComponent;
