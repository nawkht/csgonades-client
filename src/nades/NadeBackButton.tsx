import Link from "next/link";
import { FC, useMemo } from "react";
import { MdChevronLeft } from "react-icons/md";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { useNavigationState } from "../store/NavigationStore/NavigationThunks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

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
          <MdChevronLeft /> <span>Back</span>
        </button>
      )}
      {!previousIsToOwnMap && (
        <Link href={`/maps/[map]`} as={`/maps/${map}`}>
          <a className="back">
            <MdChevronLeft />
            <span>Back</span>
          </a>
        </Link>
      )}
      <style jsx>{`
        .back {
          color: ${colors.GREY};
          outline: none;
          border: none;
          background: none;
          font-weight: 300;
          font-family: "Roboto";
          padding: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          border: 1px solid ${colors.GREY};
          border-radius: 3px;
          padding: 3px;
          padding-right: 12px;
        }
      `}</style>
    </>
  );
};
