import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../../constants/Constants";
import { useFilterByPro } from "../../store/MapStore/hooks/useFilterByPro";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";
import { HelpTip } from "./HelpTip";

type Props = {
  vertical?: boolean;
};

export const FilterByProButton: FC<Props> = ({ vertical }) => {
  const { colors } = useTheme();
  const isSignedIn = useIsSignedIn();
  const { byPro, toggleFilterByPro } = useFilterByPro();
  const { setSignInWarning } = useSignInWarning();

  const active = byPro ? "active" : "";

  function onFilterByPro() {
    if (isSignedIn) {
      toggleFilterByPro();
    } else {
      setSignInWarning("filterpro");
    }
  }

  return (
    <>
      <div className="fav-filter-wrap">
        <div className="label">
          PRO
          <HelpTip hintLabel="pro">
            <div>
              <b>PRO:</b>
              <br />
              Only show nades thrown by
              <br />
              professional CS:GO players.
            </div>
          </HelpTip>
        </div>
        <button
          className={`filter-btn favorite ${active}`}
          onClick={onFilterByPro}
        >
          <FaCheckCircle />
        </button>
      </div>

      <style jsx>{`
        .label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
          color: ${vertical ? "white" : colors.TEXT};
          display: flex;
        }

        .filter-btn {
          border: none;
          outline: none;
          background: ${colors.filterBg};
          width: ${Dimensions.BUTTON_HEIGHT}px;
          height: ${Dimensions.BUTTON_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #767676;
          font-size: ${Dimensions.BUTTON_HEIGHT / 2}px;
          cursor: pointer;
          overflow: hidden;
          border-radius: 5px;
        }

        .favorite {
          color: #00b8d9;
        }

        .filter-btn:hover {
          background: ${colors.filterBgHover};
        }

        .active {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
