import { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
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
  const { isMobile } = useTheme();
  const dispatch = useDispatch();
  const window = useWindowSize();

  useEffect(() => {
    if (window.width && window.width > 1000) {
      dispatch(setBrowseraction());
    } else {
      dispatch(setMobileAction());
    }
  }, []);

  useEffect(() => {
    if (isMobile && window.width && window.width > 1000) {
      dispatch(setBrowseraction());
    }
    if (!isMobile && window.width && window.width < 1000) {
      dispatch(setMobileAction());
    }
  }, [window]);
}
