import { FC } from "react";
import { NadeLight, Nade } from "../../models/Nade/Nade";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useIsFavoriteInProgress } from "../../store/FavoriteStore/hooks/useIsFavoriteInProgress";
import { useIsFavorited } from "../../store/FavoriteStore/hooks/useIsFavorited";
import { useAddFavorite } from "../../store/FavoriteStore/hooks/useAddFavorite";
import { useUnfavorite } from "../../store/FavoriteStore/hooks/useUnFavorite";
import { Popup } from "semantic-ui-react";
import { FaStar, FaSpinner, FaTimes } from "react-icons/fa";
import { useMapFavCount } from "../../store/MapStore/hooks/useMapFavCount";
import { useAnalytics } from "../../utils/Analytics";

type Props = {
  nade: NadeLight | Nade;
};

export const NadeItemFavBtn: FC<Props> = ({ nade }) => {
  const { event } = useAnalytics();
  const isSignedIn = useIsSignedIn();
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isFavorite = useIsFavorited(nade.id);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const { incrementNadeFavCount, decrementNadeFavCount } = useMapFavCount();

  function onFavorite(e: any) {
    e.preventDefault();
    if (isFavoriteInProgress) {
      return;
    }
    if (isFavorite) {
      unFavorite(isFavorite.id);
      decrementNadeFavCount(nade.id);
      event({
        category: "Favorite",
        action: "Unfavorite from Thumbnail",
      });
    } else {
      addFavorite(nade.id);
      incrementNadeFavCount(nade.id);
      event({
        category: "Favorite",
        action: "Favorite from Thumbnail",
      });
    }
  }

  const favoriteText = isFavorite ? "Unfavorite" : "Favorite";
  const iconColor = isFavorite ? "#bbb" : "rgb(250, 200, 0)";

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Popup
        inverted
        trigger={
          <div className="fav-btn" onClick={onFavorite}>
            {isFavoriteInProgress && <FaSpinner style={{ color: "#fff" }} />}
            {!isFavoriteInProgress && isFavorite && <FaTimes />}
            {!isFavoriteInProgress && !isFavorite && <FaStar />}
          </div>
        }
        size="mini"
        position="left center"
        content={favoriteText}
      ></Popup>
      <style jsx>{`
        .icon-wrap {
          border: 1px solid red;
        }

        .fav-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${iconColor};
          border-radius: 5px;
        }

        .fav-btn:hover {
          background: rgba(0, 0, 0, 1);
        }

        .spin {
          animation: spin 0.5s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
