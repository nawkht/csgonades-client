import { FC, memo, useMemo } from "react";
import { NadeLight } from "../../models/Nade/Nade";
import { useFilteredNades } from "../../store2/FilterStore/hooks/useFilteredNades";
import { EzoicPlaceHolder } from "../ezoicLoader/EzoicPlaceHolder";
import { NadeItemMobile } from "../nadeitem/NadeItemMobile";

export const NadeListWithAds: FC = memo(() => {
  const nades = useFilteredNades();

  function renderList(nades: NadeLight[]) {
    return nades.map(nade => (
      <div key={nade.id}>
        <div className="nade-item-wrap">
          <NadeItemMobile nade={nade} />
        </div>
        <style jsx>{`
          .nade-item-wrap {
            padding: 15px;
          }
        `}</style>
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

  return (
    <>
      <div>
        <div className="ez">
          <EzoicPlaceHolder desc="Nade List Mobile | Top of page" id={118} />
        </div>
        {items1 && renderList(items1)}
        <div className="ez in-content">
          <EzoicPlaceHolder desc="Nade List Mobile | List 5" id={114} />
        </div>
        {items2 && renderList(items2)}
        <div className="ez in-content">
          <EzoicPlaceHolder desc="Nade List Mobile | List 6" id={115} />
        </div>
        {items3 && renderList(items3)}
        <div className="ez in-content">
          <EzoicPlaceHolder desc="Nade List Mobile | List 7" id={116} />
        </div>
        {rest && renderList(rest)}
      </div>
      <style jsx>{`
        .ez {
          width: 100%;
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
