import { FC } from "react";
import { FaSpinner, FaStar } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { Nade } from "../../models/Nade/Nade";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import {
  useAddFavorite,
  useIsFavorited,
  useIsFavoriteInProgress,
  useUnfavorite,
} from "../../store/FavoriteStore/FavoriteHooks";

type Props = {
  nade: Nade;
  showSignInWarning: () => void;
};

export const FavoriteButton: FC<Props> = ({ nade, showSignInWarning }) => {
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nade.id);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const isFavorited = favorite;

  function onFavoriteClick() {
    if (!isSignedIn) {
      showSignInWarning();
      return;
    }

    if (isFavoriteInProgress) {
      return;
    }
    if (favorite) {
      unFavorite(favorite.id, nade);
    } else {
      addFavorite(nade);
    }
  }

  const favoriteText = isFavorited ? "Unfavorite" : "Favorite";

  return (
    <>
      <div className="favorite-wrapper">
        <button className="favorite-btn" onClick={onFavoriteClick}>
          {isFavoriteInProgress && (
            <div className="loading">
              <FaSpinner style={{ position: "relative", top: 2 }} />
            </div>
          )}

          {!isFavoriteInProgress && (
            <>
              <span className="icon">
                <FaStar style={{ position: "relative", top: 2 }} />
              </span>
              <span className="label">{favoriteText}</span>
            </>
          )}
        </button>
      </div>
      <style jsx>{`
        .favorite-wrapper {
          margin-top: 20px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .favorite-btn {
          width: 150px;
          cursor: pointer;
          display: inline-block;
          border: none;
          outline: none;
          background: #fac800;
          border-radius: 5px;
          display: flex;
          align-items: center;
          transition: background 0.15s;
        }

        .favorite-btn:hover {
          background: #e3b600;
        }

        .icon {
          display: block;
          font-size: 18px;
          color: white;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          padding-right: 15px;
          height: 100%;
          border-right: 1px solid #f0c000;
        }

        .label {
          display: block;
          color: white;
          padding-left: 10px;
          font-size: 16px;
          text-align: center;
          width: 100%;
          padding-right: 5px;
        }

        .loading {
          display: block;
          width: 100%;
          color: white;
          padding: 10px 50px;
          font-size: 20px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .favorite-wrapper {
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
};
