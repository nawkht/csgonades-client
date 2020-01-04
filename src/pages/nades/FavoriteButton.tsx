import { Icon, Popup } from "semantic-ui-react";
import {
  useAddFavorite,
  useUnfavorite,
  useIsFavorited
} from "../../store/FavoriteStore/FavoriteHooks";
import { FC, useState, useEffect } from "react";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";

type Props = {
  nadeId: string;
};

export const FavoriteButton: FC<Props> = ({ nadeId }) => {
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nadeId);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const [starColor, setStarColor] = useState<any>(favorite ? "yellow" : "grey");
  const [didClickFavorite, setDidClickFavorite] = useState(false);

  useEffect(() => {
    if (favorite) {
      setStarColor("yellow");
    } else {
      setStarColor("grey");
    }
  }, [favorite]);

  function onFavoriteClick() {
    setDidClickFavorite(true);

    if (favorite) {
      unFavorite(favorite.id);
    } else {
      addFavorite(nadeId);
      setStarColor("yellow");
    }
  }

  function onMouseEnter() {
    if (favorite) {
      setStarColor("grey");
    } else {
      setStarColor("yellow");
    }
  }

  function onMouseLeave() {
    if (didClickFavorite) {
      setDidClickFavorite(false);
      return;
    }
    if (favorite) {
      setStarColor("yellow");
    } else {
      setStarColor("grey");
    }
  }

  if (!isSignedIn) {
    return (
      <>
        <Popup
          size="mini"
          inverted
          content={"You need to be signed in to favorite."}
          style={{ padding: 6 }}
          offset="0, 6px"
          position="left center"
          trigger={
            <span className="favicon-container">
              <Icon className="favorite-icon" name="star" />
            </span>
          }
        />
        <style jsx>{`
          .favicon-container {
            animation-name: twinkle;
            color: grey;
            animation-duration: 1s;
            animation-delay: 3s;
            display: flex;
            align-content: center;
            font-size: 2em;
            margin-bottom: -0.4em;
          }

          @keyframes twinkle {
            0% {
              color: grey;
              transform: scale(1);
            }
            50% {
              transform: scale(1.3);
              color: #ffbf00;
            }
            100% {
              transform: scale(1);
              color: grey;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <div
      onClick={onFavoriteClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Popup
        size="mini"
        inverted
        content={favorite ? "Unfavorite" : "Favorite"}
        style={{ padding: 6 }}
        offset="0, 6px"
        position="left center"
        trigger={
          <Icon
            link
            color={starColor}
            className="favorite-icon"
            name="star"
            size="large"
          />
        }
      />
    </div>
  );
};
