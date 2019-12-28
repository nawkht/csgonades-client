import { FC, useState } from "react";
import { Colors } from "../../../constants/colors";
import { TypeToggler } from "./TypeToggler";
import { UiConstants } from "../../../constants/ui";
import { CsgoMap } from "../../models/Nade";
import { NadeFilterOptions } from "../../api/NadeApi";
import { useFetchNades } from "../../store/NadeStore/NadeHooks";

type Props = {
  map: CsgoMap;
};

export const NadeFilter: FC<Props> = ({ map }) => {
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
  }

  function onSmokeClick() {
    if (!isDefault && showSmokes) {
      resetToogles();
    } else {
      const filter: NadeFilterOptions = {
        flash: showFlash,
        hegrenade: showHeGrenade,
        molotov: showMolotov,
        smoke: showSmokes
      };
      fetchNades(filter);
      setShowSmokes(true);
      setShowFlash(false);
      setShowMolotov(false);
      setShowHeGrenade(false);
      setIsDefault(false);
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
    }
  }

  return (
    <>
      <div className="nade-filter-container">
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
          top: ${UiConstants.HEADER_HEIGHT}px;
          left: ${UiConstants.SIDEBAR_WIDTH}px;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .nade-filter {
          background: white;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 3px;
          border-right: 1px solid ${Colors.PRIMARY_BORDER};
          border-top: 1px solid ${Colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${Colors.PRIMARY_BORDER};
        }
      `}</style>
    </>
  );
};
