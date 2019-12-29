import { FC, useState } from "react";
import { TypeToggler } from "./TypeToggler";
import { NadeFilterOptions } from "../../api/NadeApi";
import { useFetchNades } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";

type Props = {
  map: CsgoMap;
};

export const NadeFilter: FC<Props> = ({ map }) => {
  const { colors, isMobile, uiDimensions } = useTheme();
  const fetchNades = useFetchNades(map);
  const [showSmokes, setShowSmokes] = useState(true);
  const [showFlash, setShowFlash] = useState(true);
  const [showMolotov, setShowMolotov] = useState(true);
  const [showHeGrenade, setShowHeGrenade] = useState(true);
  const [isDefault, setIsDefault] = useState(true);

  function resetToogles() {
    setShowSmokes(true);
    setShowFlash(true);
    setShowMolotov(true);
    setShowHeGrenade(true);
    setIsDefault(true);

    fetchNades();
  }

  function onSmokeClick() {
    if (!isDefault && showSmokes) {
      resetToogles();
    } else {
      setShowSmokes(true);
      setShowFlash(false);
      setShowMolotov(false);
      setShowHeGrenade(false);
      setIsDefault(false);

      const filter: NadeFilterOptions = {
        flash: false,
        hegrenade: false,
        molotov: false,
        smoke: true
      };

      fetchNades(filter);
    }
  }

  function onFlashClick() {
    if (!isDefault && showFlash) {
      resetToogles();
    } else {
      setShowSmokes(false);
      setShowFlash(true);
      setShowMolotov(false);
      setShowHeGrenade(false);
      setIsDefault(false);

      const filter: NadeFilterOptions = {
        flash: true,
        hegrenade: false,
        molotov: false,
        smoke: false
      };

      fetchNades(filter);
    }
  }

  function onMolotovClick() {
    if (!isDefault && showMolotov) {
      resetToogles();
    } else {
      setShowSmokes(false);
      setShowFlash(false);
      setShowMolotov(true);
      setShowHeGrenade(false);
      setIsDefault(false);

      const filter: NadeFilterOptions = {
        flash: false,
        hegrenade: false,
        molotov: true,
        smoke: false
      };

      fetchNades(filter);
    }
  }

  function onHeGrenadeClick() {
    if (!isDefault && showHeGrenade) {
      resetToogles();
    } else {
      setShowSmokes(false);
      setShowFlash(false);
      setShowMolotov(false);
      setShowHeGrenade(true);
      setIsDefault(false);

      const filter: NadeFilterOptions = {
        flash: false,
        hegrenade: true,
        molotov: false,
        smoke: false
      };

      fetchNades(filter);
    }
  }

  return (
    <>
      <div
        className={
          isMobile ? "nade-filter-container-mobile" : "nade-filter-container"
        }
      >
        <div className="nade-filter">
          <TypeToggler
            active={showSmokes}
            type="smoke"
            onClick={onSmokeClick}
          />
          <TypeToggler active={showFlash} type="flash" onClick={onFlashClick} />
          <TypeToggler
            active={showMolotov}
            type="molotov"
            onClick={onMolotovClick}
          />
          <TypeToggler
            active={showHeGrenade}
            type="he-grenade"
            onClick={onHeGrenadeClick}
          />
        </div>
      </div>
      <style jsx>{`
        .nade-filter-container {
          position: fixed;
          top: ${uiDimensions.HEADER_HEIGHT}px;
          left: ${uiDimensions.SIDEBAR_WIDTH}px;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .nade-filter-container .nade-filter {
          background: white;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 3px;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          border-top: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
        }

        .nade-filter-container-mobile {
          position: fixed;
          top: ${uiDimensions.HEADER_HEIGHT}px;
          left: 0px;
          right: 0px;
          display: flex;
          justify-content: center;
        }

        .nade-filter-container-mobile .nade-filter {
          background: white;
          border-bottom-right-radius: 3px;
          border-bottom-left-radius: 3px;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          border-top: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          display: flex;
        }
      `}</style>
    </>
  );
};
