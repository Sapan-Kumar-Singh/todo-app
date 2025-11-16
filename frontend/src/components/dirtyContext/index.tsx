import { createContext, useContext, useState } from "react";

const DirtyContext = createContext({
  isDirty: false,
  setDirty: (value: boolean) => {},
});

export const DirtyProvider = ({ children }:any) => {
  const [isDirty, setIsDirty] = useState(false);

  return (
    <DirtyContext.Provider value={{ isDirty, setDirty: setIsDirty }}>
      {children}
    </DirtyContext.Provider>
  );
};

export const useDirty = () => useContext(DirtyContext);
