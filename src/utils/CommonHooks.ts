import { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import {
  setMobileAction,
  setBrowseraction
} from "../store/LayoutStore/LayoutActions";
import { useDispatch } from "react-redux";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import useComponentSize from "@rehooks/component-size";

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

export function useKeepAspectRatio() {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useComponentSize(ref);
  const height = useMemo(() => width / (16 / 9), [width]);

  return {
    ref,
    height,
    width
  };
}

export function useComponentWidth() {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const window = useWindowSize();

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [window]);

  return { ref, width };
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
