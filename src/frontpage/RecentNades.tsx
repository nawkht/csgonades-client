import { FC } from "react";
import { useSelector } from "react-redux";
import { NadeListGrid } from "../common/NadeListGrid";
import { PageCentralize } from "../common/PageCentralize";
import { recentNadesSelector } from "../store/NadeStore/NadeSelectors";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {};

export const RecentNades: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const nades = useSelector(recentNadesSelector);

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
          margin-bottom: 100px;
          margin-top: 50px;
        }
      `}</style>
    </>
  );
};
