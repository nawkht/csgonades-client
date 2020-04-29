import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useFilterByFavorites } from "../../store/MapStore/hooks/useFilterByFavorites";

type Props = {
  showSingInWarning: () => void;
};

export const FavFilterButton: FC<Props> = ({ showSingInWarning }) => {
  const { colors } = useTheme();
  const isSignedIn = useIsSignedIn();
  const { byFavorites, filterByFavorites } = useFilterByFavorites();

  const active = byFavorites ? "active" : "";

  function onFilterByFavorite() {
    if (isSignedIn) {
      filterByFavorites();
    } else {
      showSingInWarning();
    }
  }

  return (
    <>
      <button
        className={`filter-btn favorite ${active}`}
        onClick={onFilterByFavorite}
      >
        <FaStar style={{ marginLeft: -1, marginTop: -1 }} />
      </button>
      <style jsx>{`
        .filter-btn {
          border: none;
          outline: none;
          background: ${colors.primaryBtnBg};
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #767676;
          font-size: 19px;
          cursor: pointer;
          overflow: hidden;
          border-radius: 5px;
        }

        .favorite {
          color: rgb(250, 200, 0);
        }

        .filter-btn:hover {
          background: ${colors.primaryBtnHover};
        }

        .active {
          background: ${colors.primaryBtnHover};
        }
      `}</style>
    </>
  );
};
