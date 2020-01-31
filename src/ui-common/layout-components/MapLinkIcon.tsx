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
        viewBox="0 0 89.61 89.61"
        width="100%"
        height="100%"
        preserveAspectRatio="true"
        style={{ display: "block" }}
      >
        <rect
          className="outer"
          x="15.1"
          y="14.88"
          width="70.41"
          height="70.41"
          rx="12.03"
          transform="translate(-26.18 44.95) rotate(-45)"
        />
        <rect
          className="inner"
          x="28.53"
          y="28.32"
          width="43.54"
          height="43.54"
          rx="12.03"
          transform="translate(-26.18 44.95) rotate(-45)"
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
