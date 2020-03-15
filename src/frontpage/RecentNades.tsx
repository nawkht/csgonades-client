import { FC, useEffect, useState } from "react";
import { NadeApi } from "../api/NadeApi";
import { NadeListGrid } from "../common/NadeListGrid";
import { PageCentralize } from "../common/PageCentralize";
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
        setNades(res.value);
      }
    });
  }, []);

  return (
    <>
      <PageCentralize>
        <div className="recent-nades">
          <h3>Recent nades</h3>
          <NadeListGrid nades={nades} />
        </div>
      </PageCentralize>
      <style jsx>{`
        h3 {
          text-align: center;
          font-weight: 300;
          margin-bottom: 40px;
          font-size: 24px;
          color: ${colors.TEXT};
        }

        .recent-nades {
          padding-bottom: 50px;
          padding-top: 30px;
        }
      `}</style>
    </>
  );
};
