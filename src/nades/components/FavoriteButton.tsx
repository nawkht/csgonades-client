import { FC } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { ButtonWithIcon } from "../../common/ButtonWithIcon";
import { Nade } from "../../models/Nade/Nade";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useAddFavorite } from "../../store/FavoriteStore/hooks/useAddFavorite";
import { useIsFavorited } from "../../store/FavoriteStore/hooks/useIsFavorited";
import { useIsFavoriteInProgress } from "../../store/FavoriteStore/hooks/useIsFavoriteInProgress";
import { useUnfavorite } from "../../store/FavoriteStore/hooks/useUnFavorite";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";

type Props = {
  nade: Nade;
};

export const FavoriteButton: FC<Props> = ({ nade }) => {
  const { setSignInWarning } = useSignInWarning();
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nade.id);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const isFavorited = favorite;

  function onFavoriteClick() {
    if (!isSignedIn) {
      setSignInWarning("favorite");
      return;
    }

    if (isFavoriteInProgress) {
      return;
    }
    if (favorite) {
      unFavorite(favorite.id);
    } else {
      addFavorite(nade.id);
    }
  }

  const icon = isFavorited ? <FaTimes /> : <FaStar />;
  const color = isFavorited ? "#3b3305" : "#d4a900";
  const favText = isFavorited ? "UNFAVORITE" : "FAVORITE";

  return (
    <>
      <div className="favorite-wrapper">
        <ButtonWithIcon
          icon={icon}
          backgroundColor={color}
          value={favText}
          onClick={onFavoriteClick}
          loading={isFavoriteInProgress}
        />
      </div>
      <style jsx>{`
        .favorite-wrapper {
        }
      `}</style>
    </>
  );
};
