import { FC, useEffect, useState } from "react";
import { NadeApi } from "../api/NadeApi";
import { Nade } from "../models/Nade/Nade";

type Props = {
  nadeId: string;
};

export const NadeMarkdown: FC<Props> = ({ nadeId }) => {
  const [nade, setNade] = useState<Nade | null>(null);

  useEffect(() => {
    NadeApi.byId(nadeId).then(res => {
      if (res.isOk()) {
        setNade(res.value);
      }
    });
  }, []);

  if (!nade) {
    return <div>Loading...</div>;
  }

  return <div className="nade-markdown">{nade.title}</div>;
};
