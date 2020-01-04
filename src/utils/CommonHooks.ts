import { useState, useEffect } from "react";
import {
  setMobileAction,
  setBrowseraction
} from "../store/LayoutStore/LayoutActions";
import { useDispatch } from "react-redux";
import { useTheme } from "../store/LayoutStore/LayoutHooks";

export function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export function useUpdateLayout() {
  const { uiDimensions } = useTheme();
  const dispatch = useDispatch();
  const window = useWindowSize();

  useEffect(() => {
    const width = window.width || 1000;

    if (width < uiDimensions.MOBILE_THRESHHOLD) {
      dispatch(setMobileAction());
    } else {
      dispatch(setBrowseraction());
    }
  }, [window]);
}
