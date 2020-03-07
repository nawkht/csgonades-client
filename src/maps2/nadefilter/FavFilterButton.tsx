import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useNadeFilter } from "../../store/NadeFilterStore/NadeFilterHooks";

type Props = {
  showSingInWarning: () => void;
};

export const FavFilterButton: FC<Props> = ({ showSingInWarning }) => {
  const isSignedIn = useIsSignedIn();
  const { toggleFilterByFavorites, byFavorites } = useNadeFilter();

  const active = byFavorites ? "active" : "";

  function onFilterByFavorite() {
    if (isSignedIn) {
      toggleFilterByFavorites();
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
        <FaStar style={{ marginLeft: -1 }} />
      </button>

      <style jsx>{`
        .filter-btn {
          border: none;
          outline: none;
          background: transparent;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #767676;
          font-size: 20px;
          cursor: pointer;
          overflow: hidden;
        }

        .favorite {
          color: rgb(250, 200, 0);
        }

        .active {
          background: #f8ffed;
        }
      `}</style>
    </>
  );
};
