import { FC } from "react";
import { NadeListGrid } from "../common/NadeListGrid";
import { PageCentralize } from "../common/PageCentralize";
import { NadeLight } from "../models/Nade/Nade";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  recentNades: NadeLight[];
};

export const RecentNades: FC<Props> = ({ recentNades }) => {
  const { colors } = useTheme();

  return (
    <>
      <PageCentralize>
        <div className="recent-nades">
          <h3>Recent nades</h3>
          <NadeListGrid nades={recentNades} />
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
          margin-bottom: 100px;
          margin-top: 50px;
        }
      `}</style>
    </>
  );
};
