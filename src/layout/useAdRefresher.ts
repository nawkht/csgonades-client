import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAdRefresher = () => {
  const { route } = useRouter();

  useEffect(() => {
    const adIds = [];
    const elements = document.querySelectorAll(
      'div[id^="ezoic-pub-ad-placeholder"]'
    );
    elements.forEach(el => {
      const id = Number(el.id.split("-").pop());
      adIds.push(id);
    });
    console.log("> Shoudld reload ads");
  }, [route]);
};
