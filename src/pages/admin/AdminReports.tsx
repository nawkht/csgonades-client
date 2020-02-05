import Link from "next/link";
import { FC, useEffect } from "react";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const AdminReports: FC = () => {
  const { colors } = useTheme();
  const { fetchReports, reports } = useAdminPage();

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      {reports.map(r => (
        <div key={r.id} className="report">
          <p>{r.message}</p>
          <Link href={`/nades?id=${r.nadeId}`} as={`/nades/${r.nadeId}`}>
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
