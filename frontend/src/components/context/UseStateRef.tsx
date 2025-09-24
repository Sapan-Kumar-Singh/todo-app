import { useEffect, useRef, useState } from "react";
export const useStateRef = (initialState?: any) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(initialState);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  // Use "as const" below so the returned array is a proper tuple
  return [state, setState, ref] as const;
};