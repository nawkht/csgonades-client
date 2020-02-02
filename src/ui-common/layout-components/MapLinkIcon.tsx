import { FC, useMemo } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  csMap: CsgoMap;
};

export const MapLinkIcon: FC<Props> = ({ csMap }) => {
  const { colors } = useTheme();
  const outer = useMemo(() => {
    switch (csMap) {
      case "dust2":
        return "#a09981";
      case "cache":
        return "#700310";
      case "vertigo":
        return "#9a1d21";
      case "train":
        return "#f2612a";
      case "overpass":
        return "#fbca0b";
      case "nuke":
        return "#b7ac13";
      case "mirage":
        return "#0ea4c0";
      case "inferno":
        return "#9a8a75";
      case "cobblestone":
        return "#551d6e";
      default:
        return "#000";
    }
  }, [csMap]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 67 67"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        <circle className="outer" cx="33.5" cy="33.5" r="33.5" />
        <rect
          className="inner"
          x="32.77"
          y="32.56"
          width="35.05"
          height="35.05"
          rx="6.47"
          transform="translate(-37.68 33.24) rotate(-45)"
        />
      </svg>
      <style jsx>{`
        .inner {
          fill: ${colors.DP01};
        }
        .outer {
          fill: ${outer};
        }
      `}</style>
    </>
  );
};
