import { FC, useEffect, useState } from "react";
import { NadeApi } from "../api/NadeApi";
import { NadeListGrid } from "../common/NadeListGrid";
import { NadeLight } from "../models/Nade/Nade";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  recentNades: NadeLight[];
};

export const RecentNades: FC<Props> = ({ recentNades }) => {
  const [nades, setNades] = useState(recentNades);
  const { colors } = useTheme();

  useEffect(() => {
    NadeApi.getAll().then(res => {
      if (res.isOk()) {
        const fetchedNades = res.value.slice(0, 6);
        setNades(fetchedNades);
      }
    });
  }, []);

  return (
    <>
      <div className="recent-nades">
        <h3>Recent nades</h3>
        <NadeListGrid nades={nades} />
      </div>
      <style jsx>{`
        h3 {
          text-align: center;
          font-weight: 300;
          font-size: 24px;
          color: ${colors.TEXT};
        }

        .recent-nades {
          flex: 1;
        }
      `}</style>
    </>
  );
};
