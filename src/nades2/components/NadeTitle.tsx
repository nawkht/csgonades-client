import { FC, useMemo } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeType } from "../../models/Nade/NadeType";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { capitalize } from "../../utils/Common";

type Props = {
  title: string;
  type?: NadeType;
  map?: CsgoMap;
};

export const NadeTitle: FC<Props> = ({ title, map, type }) => {
  const { colors } = useTheme();

  const nadeTitle = useMemo(() => {
    const titleBuilder = [];

    if (map) {
      titleBuilder.push(capitalize(map));
    }

    if (type) {
      titleBuilder.push(type);
      titleBuilder.push("for");
    }

    if (title.length) {
      titleBuilder.push(title);
    }

    if (titleBuilder.length === 0) {
      return "No title";
    }

    return titleBuilder.join(" ");
  }, [title, map, type]);

  return (
    <>
      <h1>{nadeTitle}</h1>
      <style jsx>{`
        h1 {
          text-align: center;
          font-size: 30px;
          margin: 0;
          padding: 0;
          margin-bottom: 30px;
          font-weight: 300;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
