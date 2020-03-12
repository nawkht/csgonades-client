import Link from "next/link";
import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useAdminReports } from "../store2/AdminStore/hooks";

export const AdminReports: FC = () => {
  const { colors } = useTheme();
  const { reports } = useAdminReports();

  return (
    <div>
      <h2>Reports</h2>
      {reports.map(r => (
        <div key={r.id} className="report">
          <p>{r.message}</p>
          <Link href={`/nades/[nade]`} as={`/nades/${r.nadeId}`}>
            <a>NADE</a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .report {
          border: 1px solid ${colors.BORDER};
          padding: 12px 18px;
          background: ${colors.DP01};
          border-radius: 4px;
          color: ${colors.TEXT};
        }
      `}</style>
    </div>
  );
};
