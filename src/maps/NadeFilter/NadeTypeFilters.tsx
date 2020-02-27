import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../store/NadeFilterStore/NadeFilterHooks";
import { TypeToggler } from "./TypeToggler";

type Props = {
  map: CsgoMap;
};

export const NadeTypeFilters: FC<Props> = () => {
  const { filterByType, byType } = useNadeFilter();

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
        <TypeToggler
          active={byType === "smoke"}
          type="smoke"
          onClick={onSmokeClick}
        />
        <TypeToggler
          active={byType === "flash"}
          type="flash"
          onClick={onFlashClick}
        />
        <TypeToggler
          active={byType === "molotov"}
          type="molotov"
          onClick={onMolotovClick}
        />
        <TypeToggler
          active={byType === "hegrenade"}
          type="hegrenade"
          onClick={onHeGrenadeClick}
        />
      </div>
      <style jsx>{`
        .nade-filter {
          display: flex;
        }

        .nade-filter {
          margin-right: 12px;
        }
      `}</style>
    </>
  );
};
