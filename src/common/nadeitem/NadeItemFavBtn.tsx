import { FC, useState, useEffect } from "react";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useIsFavoriteInProgress } from "../../store/FavoriteStore/hooks/useIsFavoriteInProgress";
import { useIsFavorited } from "../../store/FavoriteStore/hooks/useIsFavorited";
import { useAddFavorite } from "../../store/FavoriteStore/hooks/useAddFavorite";
import { useUnfavorite } from "../../store/FavoriteStore/hooks/useUnFavorite";
import { Popup } from "semantic-ui-react";
import { FaStar, FaSpinner, FaTimes } from "react-icons/fa";
import { useMapFavCount } from "../../store/MapStore/hooks/useMapFavCount";
import { useAnalytics } from "../../utils/Analytics";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";

type Props = {
  nadeId: string;
  slug?: string;
  disableAction?: boolean;
};

export const NadeItemFavBtn: FC<Props> = ({ nadeId, slug, disableAction }) => {
  const [render, setRender] = useState(false);
  const { setSignInWarning } = useSignInWarning();
  const { event } = useAnalytics();
  const isSignedIn = useIsSignedIn();
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isFavorite = useIsFavorited(nadeId);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const { incrementNadeFavCount, decrementNadeFavCount } = useMapFavCount();

  useEffect(() => {
    const delay = setTimeout(() => {
      setRender(true);
    }, 500);
    return () => clearTimeout(delay);
  }, []);

  function onFavorite(e: any) {
    e.stopPropagation();
    e.preventDefault();
    if (!isSignedIn) {
      setSignInWarning("favorite");
      return;
    }

    if (isFavoriteInProgress) {
      return;
    }
    if (isFavorite) {
      unFavorite(isFavorite.id);
      decrementNadeFavCount(nadeId);
      event({
        category: "Favorite",
        action: "Unfavorite from Thumbnail",
        label: slug,
      });
    } else {
      addFavorite(nadeId);
      incrementNadeFavCount(nadeId);
      event({
        category: "Favorite",
        action: "Favorite from Thumbnail",
        label: slug || nadeId,
      });
    }
  }

  const favoriteText = isFavorite ? "Unfavorite" : "Favorite";
  const iconColor = isFavorite ? "#bbb" : "rgb(250, 200, 0)";

  if (!render) {
    return null;
  }

  return (
    <>
      {!disableAction && (
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
      )}

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
