import { FC } from "react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { TypeToggler } from "./TypeToggler";

type Props = {
  map: CsgoMap;
};

export const NadeTypeFilters: FC<Props> = ({ map }) => {
  const { filterByType, nadeFilter } = useNadeFilter(map);
  const { flash, hegrenade, molotov, smoke } = nadeFilter;

  function onSmokeClick() {
    filterByType("smoke");
  }

  function onFlashClick() {
    filterByType("flash");
  }

  function onMolotovClick() {
    filterByType("molotov");
  }

  function onHeGrenadeClick() {
    filterByType("hegrenade");
  }

  return (
    <>
      <div className="nade-filter">
        <TypeToggler active={smoke} type="smoke" onClick={onSmokeClick} />
        <TypeToggler active={flash} type="flash" onClick={onFlashClick} />
        <TypeToggler active={molotov} type="molotov" onClick={onMolotovClick} />
        <TypeToggler
          active={hegrenade}
          type="hegrenade"
          onClick={onHeGrenadeClick}
        />
      </div>
      <style jsx>{`
        .nade-filter {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};
