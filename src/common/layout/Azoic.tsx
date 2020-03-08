import { FC, memo } from "react";
import { Helmet } from "react-helmet";
import { useSiteStats } from "../../store/GlobalStore/GlobalHooks";

type Props = {};

export const Azoic: FC<Props> = memo(({}) => {
  const { stats } = useSiteStats();

  const { ezoicEnabled } = stats;

  if (!ezoicEnabled) {
    return null;
  }

  return (
    <>
      <Helmet>
        <script>var ezoicId = 179726; </script>
        <script
          type="text/javascript"
          src="//go.ezoic.net/ezoic/ezoic.js"
        ></script>
      </Helmet>
      <style jsx>{``}</style>
    </>
  );
});
