import Link from "next/link";
import { FC, useMemo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { useNavigationState } from "../store/NavigationStore/NavigationThunks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { capitalize } from "../utils/Common";

type Props = {
  map?: CsgoMap;
};

export const NadeBackButton: FC<Props> = ({ map }) => {
  const { colors } = useTheme();
  const { previousRoute } = useNavigationState();

  const previousIsToOwnMap = useMemo(() => {
    if (!previousRoute || !map) {
      return false;
    }
    if (previousRoute.includes(map)) {
      return true;
    } else {
      return false;
    }
  }, [previousRoute, map]);

  if (!map) {
    return null;
  }

  return (
    <>
      {previousIsToOwnMap && (
        <button className="back" onClick={() => history.back()}>
          {capitalize(map)}
        </button>
      )}
      {!previousIsToOwnMap && (
        <Link href={`/maps?name=${map}`} as={`/maps/${map}`}>
          <a className="back">{capitalize(map)}</a>
        </Link>
      )}
      <style jsx>{`
        .back {
          color: ${colors.TEXT};
          outline: none;
          border: none;
          background: none;
          font-weight: 300;
          font-family: "Roboto";
          padding: 0;
          cursor: pointer;
        }

        .back:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
