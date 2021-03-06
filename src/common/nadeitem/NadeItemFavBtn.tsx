import { FC, useState, useEffect } from "react";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useIsFavoriteInProgress } from "../../store/FavoriteStore/hooks/useIsFavoriteInProgress";
import { useIsFavorited } from "../../store/FavoriteStore/hooks/useIsFavorited";
import { useAddFavorite } from "../../store/FavoriteStore/hooks/useAddFavorite";
import { useUnfavorite } from "../../store/FavoriteStore/hooks/useUnFavorite";
import { Popup } from "semantic-ui-react";
import { FaStar } from "react-icons/fa";
import { useMapFavCount } from "../../store/MapStore/hooks/useMapFavCount";
import { useAnalytics } from "../../utils/Analytics";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";

type Props = {
  nadeId: string;
  slug?: string;
  disableAction?: boolean;
};

export const NadeItemFavBtn: FC<Props> = ({ nadeId, slug, disableAction }) => {
  const [nadeIsFavorite, setNadeIsFavorite] = useState(false);
  const { setSignInWarning } = useSignInWarning();
  const { event } = useAnalytics();
  const isSignedIn = useIsSignedIn();
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isFavorite = useIsFavorited(nadeId);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const { incrementNadeFavCount, decrementNadeFavCount } = useMapFavCount();

  useEffect(() => {
    if (isFavorite) {
      setNadeIsFavorite(true);
    }
  }, [isFavorite]);

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
      setNadeIsFavorite(false);
      unFavorite(isFavorite.id);
      decrementNadeFavCount(nadeId);
      event({
        category: "Favorite",
        action: "Unfavorite from Thumbnail",
        label: slug,
      });
    } else {
      setNadeIsFavorite(true);
      addFavorite(nadeId);
      incrementNadeFavCount(nadeId);
      event({
        category: "Favorite",
        action: "Favorite from Thumbnail",
        label: slug || nadeId,
      });
    }
  }

  const favoriteText = nadeIsFavorite ? "Unfavorite" : "Favorite";
  const iconColor = nadeIsFavorite ? "rgb(250, 200, 0)" : "white";

  return (
    <>
      {!disableAction && (
        <Popup
          inverted
          mouseEnterDelay={200}
          trigger={
            <div className="fav-btn" onClick={onFavorite}>
              <FaStar className="icon-fix-yo" />
            </div>
          }
          size="mini"
          position="left center"
          content={favoriteText}
        ></Popup>
      )}

      <style jsx global>{`
        .icon-fix-yo {
          font-size: 16px;
          margin: 0;
          padding: 0;
          line-height: 16px;
          position: relative;
        }
      `}</style>

      <style jsx>{`
        .fav-btn {
          background: rgba(0, 0, 0, 0.5);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${iconColor};
          border-radius: 5px;
        }

        .fav-btn:hover {
          background: rgba(0, 0, 0, 1);
          color: rgb(250, 200, 0);
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
