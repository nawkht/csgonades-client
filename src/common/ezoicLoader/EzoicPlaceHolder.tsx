import { FC, memo } from "react";
import { useAnalytics } from "../../utils/Analytics";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const { event } = useAnalytics();

  function onAdClick() {
    event({
      category: "Ad",
      action: "Click",
      label: `${id}`,
    });
  }

  return (
    <span onClick={onAdClick}>
      <div id={`ezoic-pub-ad-placeholder-${id}`} />
    </span>
  );
});
