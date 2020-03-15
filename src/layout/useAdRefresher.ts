import { useEffect } from "react";
import { useRouter } from "next/router";
import { ezoicInit } from "../common/ezoicLoader/EzoinInit";

const isBrowser = typeof window !== "undefined";

export const useAdRefresher = () => {
  const { route } = useRouter();

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const adIds = [];
    const elements = document.querySelectorAll(
      'div[id^="ezoic-pub-ad-placeholder"]'
    );
    elements.forEach(el => {
      try {
        const id = Number(el.id.split("-").pop());
        adIds.push(id);
      } catch (error) {
        console.error("Failed to parse ad id");
      }
    });
    ezoicInit(adIds);
  }, [route]);
};
