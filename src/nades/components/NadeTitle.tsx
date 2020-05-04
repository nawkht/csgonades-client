import { FC, useMemo } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeType } from "../../models/Nade/NadeType";
import { capitalize } from "../../utils/Common";
import { EditButton } from "./EditButton";

type Props = {
  title: string;
  type?: NadeType;
  map?: CsgoMap;
  onEditNade: () => void;
  allowEdit: boolean;
};

export const NadeTitle: FC<Props> = ({
  title,
  map,
  type,
  onEditNade,
  allowEdit,
}) => {
  const nadeTitle = useMemo(() => {
    return nadeTitleBuilder(type, title, map);
  }, [title, map, type]);

  return (
    <>
      <EditButton onClick={onEditNade} allowEdit={allowEdit}>
        <h1>{nadeTitle}</h1>
      </EditButton>

      <style jsx>{`
        h1 {
          font-size: 28px;
          margin: 0;
          padding: 0;
          font-weight: 300;
          color: white;
          text-align: left;
          padding: 10px 0px;
        }
      `}</style>
    </>
  );
};

export const nadeTitleBuilder = (
  type?: NadeType,
  title?: string,
  map?: CsgoMap
) => {
  const titleBuilder: string[] = [];

  if (type) {
    titleBuilder.push(capitalize(type));
  }

  if (title && title.length) {
    titleBuilder.push(title);
  }

  if (map) {
    titleBuilder.push("on");
    titleBuilder.push(capitalize(map));
  }

  if (titleBuilder.length === 0) {
    return "No title";
  }

  return titleBuilder.join(" ");
};
