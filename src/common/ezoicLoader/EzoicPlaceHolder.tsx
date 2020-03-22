import { FC, memo, useEffect } from "react";
import { useAnalytics } from "../../utils/Analytics";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const { event } = useAnalytics();
  const divId = `ezoic-pub-ad-placeholder-${id}`;

  useEffect(() => {
    if (id !== 130) {
      return;
    }

    const delayedCheck = setTimeout(() => {
      const node = document.getElementById(divId);
      if (!node) {
        event({
          category: "Ads",
          action: "Placeholder removed",
        });
        return;
      }

      const ezLenght = node.innerHTML.length;

      if (ezLenght) {
        event({
          category: "Ads",
          action: "Ad displayed",
        });
      } else {
        event({
          category: "Ads",
          action: "Empty placeholder",
        });
      }
    }, 8000);

    return () => clearTimeout(delayedCheck);
  }, [event, divId, id]);

  return <div key={divId} id={divId}></div>;
});
