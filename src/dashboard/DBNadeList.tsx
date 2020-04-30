import { FC, useState, useEffect, useMemo } from "react";
import { NadeLight, Status } from "../models/Nade/Nade";
import { NadeApi } from "../api/NadeApi";
import { useSignedInUser } from "../store/AuthStore/AuthHooks";
import { kFormatter, sortByDate, capitalize } from "../utils/Common";
import { PageLink } from "../common/PageLink";
import { prettyDate } from "../utils/DateUtils";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {};

export const DBNadeList: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const user = useSignedInUser();
  const [userNades, setUserNades] = useState<NadeLight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      NadeApi.byUser(user.steamId)
        .then((res) => {
          if (res.isOk()) {
            const nades = res.value;
            nades.sort((a, b) => sortByDate(a.createdAt, b.createdAt));
            setUserNades(nades);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userNades.length === 0 && !loading) {
    return (
      <div>
        You don&apos;t have any nades. If you know any good ones, add one.
      </div>
    );
  }

  return (
    <>
      <div id="nade-list">
        <table>
          <thead>
            <tr>
              <td>Status</td>
              <td>Type</td>
              <td>Title</td>
              <td>Favourites</td>
              <td>Comments</td>
              <td>Views</td>
              <td>Created</td>
            </tr>
          </thead>
          <tbody>
            {userNades.map((n) => (
              <NadeItem key={n.id} nade={n} />
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        table {
          border-collapse: collapse;
          width: 100%;
          table-layout: auto;
          color: ${colors.TEXT};
        }

        table thead td {
          font-weight: 400;
        }
      `}</style>
    </>
  );
};

type NadeItemProps = {
  nade: NadeLight;
};

export const NadeItem: FC<NadeItemProps> = ({ nade }) => {
  return (
    <>
      <tr className="nade-item">
        <td>
          <StatusText status={nade.status} />
        </td>
        <td className="nade-type">
          {<img src={`/icons/grenades/${nade.type}.png`} />}
        </td>
        <td id="nade-title">
          <PageLink href="/nades/[nade]" as={`/nades/${nade.slug || nade.id}`}>
            <span>{nade.title}</span>
          </PageLink>
        </td>
        <td className="nade-fav">{nade.favoriteCount}</td>
        <td className="nade-comments">{nade.commentCount}</td>
        <td id="nade-views">{kFormatter(nade.viewCount)}</td>
        <td>{prettyDate(nade.createdAt)}</td>
      </tr>
      <style jsx>{`
        .nade-item {
          border-collapse: collapse;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .nade-item td {
          padding-bottom: 10px;
          padding-top: 10px;
        }

        .nade-title {
          width: 100%;
        }

        .nade-views,
        .nade-fav,
        .nade-type {
          width: 100px;
        }

        .nade-type img {
          width: 25px;
          height: 25px;
          display: block;
        }
      `}</style>
    </>
  );
};

const StatusText: FC<{ status: Status }> = ({ status }) => {
  const statusString = capitalize(status);

  const statusColor = useMemo(() => {
    if (status === "accepted") {
      return "green";
    } else {
      return "red";
    }
  }, [status]);

  return (
    <>
      <span>{statusString}</span>
      <style jsx>{`
        span {
          color: ${statusColor};
        }
      `}</style>
    </>
  );
};
