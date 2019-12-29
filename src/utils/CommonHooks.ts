import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useReduxDispatch } from "../store/StoreUtils/ThunkActionType";
import {
  setMobileAction,
  setBrowseraction
} from "../store/LayoutStore/LayoutActions";
import { useDispatch } from "react-redux";
import { useIsMobile } from "../store/LayoutStore/LayoutHooks";

function useWindowSize() {
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
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const window = useWindowSize();

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      const height = ref.current.offsetWidth / (16 / 9);
      setHeight(height);
    }
  }, [window]);

  return {
    ref,
    width,
    height
  };
}

export function useUpdateLayout() {
  const isMobile = useIsMobile();
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
