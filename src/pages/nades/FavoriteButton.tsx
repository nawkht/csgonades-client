import { FC } from "react";
import { Button, Popup } from "semantic-ui-react";
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
};

export const FavoriteButton: FC<Props> = ({ nade }) => {
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nade.id);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const isFavorited = favorite;

  function onFavoriteClick() {
    if (favorite) {
      unFavorite(favorite.id, nade);
    } else {
      addFavorite(nade);
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
          position="top center"
          trigger={
            <span className="favicon-container">
              <Button
                fluid
                disabled
                content="Favorite"
                icon="star"
                labelPosition="left"
                color="yellow"
              />
            </span>
          }
        />
        <style jsx>{`
          .favicon-container {
            width: 48%;
            color: grey;
            display: flex;
            align-content: center;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="fav-btn-container">
        <Button
          fluid
          content={isFavorited ? "Unfavorite" : "Favorite"}
          disabled={isFavoriteInProgress}
          loading={isFavoriteInProgress}
          icon="star"
          labelPosition="left"
          color="yellow"
          onClick={onFavoriteClick}
        />
      </div>
      <style jsx>{`
        .fav-btn-container {
          width: 48%;
        }
      `}</style>
    </>
  );
};
