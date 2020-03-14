import { FC, memo, useMemo } from "react";
import { NadeLight } from "../../models/Nade/Nade";
import { useFilteredNades } from "../../store2/FilterStore/hooks/useFilteredNades";
import { EzoicPlaceHolder } from "../ezoicLoader/EzoicPlaceHolder";
import { NadeItemMobile } from "../nadeitem/NadeItemMobile";

type Props = {
  adCodes: number[];
};

export const NadeListWithAds: FC<Props> = memo(({ adCodes }) => {
  const nades = useFilteredNades();

  function renderList(nades: NadeLight[]) {
    return nades.map(nade => (
      <div key={nade.id} style={{ marginBottom: 20, marginTop: 20 }}>
        <NadeItemMobile nade={nade} />
      </div>
    ));
  }

  const chunks: NadeLight[][] = useMemo(() => {
    return chunk(nades, 5);
  }, [nades]);

  const items1 = chunks.length > 0 ? chunks[0] : false;
  const items2 = chunks.length > 1 ? chunks[1] : false;
  const items3 = chunks.length > 2 ? chunks[2] : false;
  const rest = chunks.length > 3 ? chunks[3] : false;

  const topOfPageAd = adCodes.length > 0 ? adCodes[0] : false;
  const firstAd = adCodes.length > 1 ? adCodes[1] : false;
  const secondAd = adCodes.length > 2 ? adCodes[2] : false;
  const thirdAd = adCodes.length > 3 ? adCodes[3] : false;

  return (
    <>
      <div>
        {topOfPageAd && (
          <div className="ez">
            <EzoicPlaceHolder id={topOfPageAd} />
          </div>
        )}
        {items1 && renderList(items1)}
        {firstAd && (
          <div className="ez in-content">
            <EzoicPlaceHolder id={firstAd} />
          </div>
        )}
        {items2 && renderList(items2)}
        {secondAd && (
          <div className="ez in-content">
            <EzoicPlaceHolder id={secondAd} />
          </div>
        )}
        {items3 && renderList(items3)}
        {thirdAd && (
          <div className="ez in-content">
            <EzoicPlaceHolder id={thirdAd} />
          </div>
        )}
        {rest && renderList(rest)}
      </div>
      <style jsx>{`
        .ez {
        }

        .in-content {
        }
      `}</style>
    </>
  );
});

const chunk = (arr: any[], size: number) => {
  const result = [];
  const chunks = Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

  const firstPart = chunks.shift();
  if (firstPart) {
    result.push(firstPart);
  }

  const secondPart = chunks.shift();
  if (secondPart) {
    result.push(secondPart);
  }

  const thirdPart = chunks.shift();
  if (thirdPart) {
    result.push(thirdPart);
  }

  if (chunks.length) {
    const rest = chunks.reduce((a, b) => a.concat(b));
    result.push(rest);
  }

  return result;
};
